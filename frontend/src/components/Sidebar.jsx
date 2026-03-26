import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiList, FiPieChart, FiUser, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '10px', borderRadius: '12px' }}>
          <FiPieChart size={24} color="#60a5fa" />
        </div>
        <h2>ExpenseTracker</h2>
      </div>

      <div className="sidebar-user">
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt={user.username} className="avatar" style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
        ) : (
          <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
        )}
        <div className="user-info">
          <p className="name">{user?.username}</p>
          <p className="email">{user?.email}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} end>
          <FiHome size={20} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/manage-expenses" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <FiList size={20} /> <span>Manage Expenses</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <FiPieChart size={20} /> <span>Reports</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <FiUser size={20} /> <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
