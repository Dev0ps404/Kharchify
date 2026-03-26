import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import { FiFilter, FiSearch } from 'react-icons/fi';

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/expenses');
      setExpenses(res.data);
      setFilteredExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle Filtering
  useEffect(() => {
    let result = expenses;
    
    if (searchTerm) {
      result = result.filter(ex => 
        (ex.description && ex.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (categoryFilter) {
      result = result.filter(ex => ex.category === categoryFilter);
    }
    
    setFilteredExpenses(result);
  }, [searchTerm, categoryFilter, expenses]);

  const categories = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Bills', 'Other'];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1>Manage Expenses</h1>
        <p>View, search, and filter all your past transactions.</p>
      </div>

      {expenseToEdit && (
        <div style={{ marginBottom: '30px' }}>
          <ExpenseForm 
            fetchExpenses={fetchExpenses} 
            expenseToEdit={expenseToEdit} 
            setExpenseToEdit={setExpenseToEdit} 
          />
        </div>
      )}

      <div className="glass-panel" style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        <div className="input-icon-wrapper" style={{ flex: '1', minWidth: '250px' }}>
          <FiSearch className="input-icon" />
          <input 
            type="text" 
            placeholder="Search by description..." 
            className="form-input form-input-with-icon" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div className="input-icon-wrapper" style={{ width: '250px' }}>
          <FiFilter className="input-icon" />
          <select 
            className="form-input form-input-with-icon"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value === 'All' ? '' : e.target.value)}
            style={{ width: '100%' }}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

      </div>

      <ExpenseList 
        expenses={filteredExpenses} 
        fetchExpenses={fetchExpenses} 
        setExpenseToEdit={setExpenseToEdit} 
      />
      
    </div>
  );
};

export default ManageExpenses;
