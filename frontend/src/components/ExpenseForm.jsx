import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2 } from 'react-icons/fi';

const ExpenseForm = ({ fetchExpenses, expenseToEdit, setExpenseToEdit }) => {
  const [formData, setFormData] = useState({
    amount: expenseToEdit ? expenseToEdit.amount : '',
    category: expenseToEdit ? expenseToEdit.category : 'Food',
    description: expenseToEdit ? expenseToEdit.description : '',
    date: expenseToEdit ? new Date(expenseToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  // Categories predefined list
  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Bills', 'Other'];

  // Effect to update form if expenseToEdit changes
  React.useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        description: expenseToEdit.description,
        date: new Date(expenseToEdit.date).toISOString().split('T')[0]
      });
    }
  }, [expenseToEdit]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expenseToEdit) {
        await axios.put(`/expenses/${expenseToEdit._id}`, formData);
        toast.success('Expense updated');
        setExpenseToEdit(null);
      } else {
        await axios.post('/expenses', formData);
        toast.success('Expense added');
      }
      setFormData({ amount: '', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });
      fetchExpenses();
    } catch (err) {
      toast.error('Failed to save expense');
    }
  };

  const onCancel = () => {
    setExpenseToEdit(null);
    setFormData({ amount: '', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '20px' }}>
      <h3>{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h3>
      <form onSubmit={onSubmit} style={{ marginTop: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="input-group">
            <label>Amount (!)</label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={onChange} 
              className="form-input"
              required 
              min="0.01" step="0.01"
              placeholder="0.00"
            />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={onChange}
              className="form-input" 
              required 
            />
          </div>
        </div>
        
        <div className="input-group">
          <label>Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={onChange} 
            className="form-input"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="input-group">
          <label>Description (Optional)</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={onChange} 
            className="form-input"
            placeholder="What was this expense for?"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {expenseToEdit ? <><FiEdit2 /> Update</> : <><FiPlus /> Add Expense</>}
          </button>
          
          {expenseToEdit && (
            <button type="button" className="btn btn-danger" onClick={onCancel} style={{ flex: 1 }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
