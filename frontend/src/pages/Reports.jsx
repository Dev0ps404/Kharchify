import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseChart from '../components/ExpenseChart';

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('/expenses');
        setExpenses(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1>Financial Reports</h1>
        <p>Analyze your spending patterns with detailed dynamic charts.</p>
      </div>
      
      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading charts...</p>
      ) : expenses.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Not enough data to generate reports. Please add some expenses first.</p>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ExpenseChart expenses={expenses} />
        </div>
      )}
    </div>
  );
};

export default Reports;
