import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  // Process Data for Doughnut Chart (Expenses by Category)
  const categoryData = useMemo(() => {
    const cats = {};
    expenses.forEach(e => {
      cats[e.category] = (cats[e.category] || 0) + Number(e.amount);
    });

    return {
      labels: Object.keys(cats),
      datasets: [
        {
          data: Object.values(cats),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)', // blue
            'rgba(16, 185, 129, 0.8)', // green
            'rgba(245, 158, 11, 0.8)', // yellow
            'rgba(239, 68, 68, 0.8)', // red
            'rgba(168, 85, 247, 0.8)', // purple
            'rgba(236, 72, 153, 0.8)', // pink
            'rgba(107, 114, 128, 0.8)', // gray
          ],
          borderColor: 'rgba(30, 41, 59, 1)',
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

  // Process Data for Bar Chart (Expenses Last 7 Days)
  const last7DaysData = useMemo(() => {
    // Generate last 7 days keys
    const days = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[format(d, 'MMM dd')] = 0;
    }

    expenses.forEach(e => {
      const dateKey = format(new Date(e.date), 'MMM dd');
      if (days[dateKey] !== undefined) {
        days[dateKey] += Number(e.amount);
      }
    });

    return {
      labels: Object.keys(days),
      datasets: [
        {
          label: 'Daily Expense (₹)',
          data: Object.values(days),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderRadius: 8,
        }
      ]
    };
  }, [expenses]);

  if (!expenses || expenses.length === 0) {
    return null;
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#f8fafc', font: { family: "'Inter', sans-serif" } }
      }
    },
    cutout: '70%',
    maintainAspectRatio: false
  };

  const barOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: { 
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h3 style={{ marginBottom: '20px' }}>Expense Distribution</h3>
        <div style={{ height: '250px' }}>
          <Doughnut data={categoryData} options={chartOptions} />
        </div>
      </div>
      <hr style={{ borderColor: 'var(--border-color)', margin: '10px 0' }} />
      <div>
        <h3 style={{ marginBottom: '20px' }}>Last 7 Days</h3>
        <div style={{ height: '250px' }}>
          <Bar data={last7DaysData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
