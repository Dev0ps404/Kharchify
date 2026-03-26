import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { FiTrash2, FiEdit, FiClock } from 'react-icons/fi';

const ExpenseList = ({ expenses, fetchExpenses, setExpenseToEdit }) => {
  
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`/expenses/${id}`);
        toast.success('Expense deleted');
        fetchExpenses();
      } catch (error) {
        toast.error('Error deleting expense');
      }
    }
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="glass-panel text-center" style={{ padding: '40px 20px' }}>
        <FiClock size={40} color="var(--text-secondary)" style={{ marginBottom: '15px' }}/>
        <h3 style={{ color: 'var(--text-secondary)' }}>No expenses yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Add your first expense to see it here.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ overflowX: 'auto' }}>
      <h3>Recent Transactions</h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
            <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Date</th>
            <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Description</th>
            <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Category</th>
            <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Amount</th>
            <th style={{ padding: '12px 10px', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
              <td style={{ padding: '16px 10px' }}>
                {format(new Date(expense.date), 'MMM dd, yyyy')}
              </td>
              <td style={{ padding: '16px 10px' }}>
                {expense.description || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No description</span>}
              </td>
              <td style={{ padding: '16px 10px' }}>
                <span style={{ 
                  background: 'rgba(59, 130, 246, 0.2)', 
                  color: 'var(--accent-color)',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  {expense.category}
                </span>
              </td>
              <td style={{ padding: '16px 10px', fontWeight: 'bold' }}>
                ₹{Number(expense.amount).toFixed(2)}
              </td>
              <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                <button 
                  onClick={() => setExpenseToEdit(expense)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', marginRight: '15px' }}
                  title="Edit"
                >
                  <FiEdit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(expense._id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
