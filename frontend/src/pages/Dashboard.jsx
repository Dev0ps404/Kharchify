import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { AuthContext } from '../context/AuthContext';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPlus } from 'react-icons/fi';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/expenses');
      setExpenses(res.data);
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTotal = res.data.reduce((acc, curr) => {
        const itemDate = new Date(curr.date);
        if(itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear) {
          return acc + Number(curr.amount);
        }
        return acc;
      }, 0);
      
      setTotalMonthly(monthlyTotal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEditClick = (expense) => {
     setExpenseToEdit(expense);
     setShowAddModal(true);
  };

  const budget = user?.monthlyBudget || 0;
  const remaining = budget - totalMonthly;

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, here's your financial summary.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setExpenseToEdit(null);
          setShowAddModal(!showAddModal);
        }}>
          <FiPlus /> {showAddModal ? 'Close Form' : 'Add Expense'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>This Month Spent</h3>
            <FiTrendingDown color="#ef4444" size={24} />
          </div>
          <p className="amount">₹{totalMonthly.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Monthly Budget</h3>
            <FiDollarSign color="#3b82f6" size={24} />
          </div>
          <p className="amount">₹{budget.toFixed(2)}</p>
        </div>

        <div className="stat-card" style={{ background: remaining >= 0 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)' : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Remaining</h3>
            {remaining >= 0 ? <FiTrendingUp color="#10b981" size={24} /> : <FiTrendingDown color="#ef4444" size={24} />}
          </div>
          <p className="amount" style={{ color: remaining >= 0 ? '#10b981' : '#ef4444' }}>
            ₹{remaining.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="left-column">
          {showAddModal && (
            <ExpenseForm 
              fetchExpenses={fetchExpenses} 
              expenseToEdit={expenseToEdit}
              setExpenseToEdit={(val) => {
                setExpenseToEdit(val);
                if(val === null) setShowAddModal(false);
              }}
            />
          )}
          
          <div style={{ marginTop: showAddModal ? '20px' : '0' }}>
             <ExpenseList 
                expenses={expenses.slice(0, 5)} 
                fetchExpenses={fetchExpenses} 
                setExpenseToEdit={handleEditClick} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
