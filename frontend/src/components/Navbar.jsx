import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut, FiPieChart } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar animate-fade-in">
      <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FiPieChart size={28} color="var(--accent-color)" />
        <h2 style={{ marginBottom: 0, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ExpenseTracker</h2>
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <span style={{ color: 'var(--text-secondary)' }}>Welcome, <strong>{user.username}</strong></span>
            <button onClick={handleLogout} className="btn btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn" style={{ border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
