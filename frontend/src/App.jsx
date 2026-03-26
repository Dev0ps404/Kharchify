import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageExpenses from './pages/ManageExpenses';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

const PrivateLayout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>; // Optional loading state
  if (!user) return <Navigate to="/login" />;
  
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<PrivateLayout><Dashboard /></PrivateLayout>} />
        <Route path="/manage-expenses" element={<PrivateLayout><ManageExpenses /></PrivateLayout>} />
        <Route path="/reports" element={<PrivateLayout><Reports /></PrivateLayout>} />
        <Route path="/profile" element={<PrivateLayout><Profile /></PrivateLayout>} />
      </Routes>
      <ToastContainer theme="dark" position="bottom-right" />
    </Router>
  );
}

export default App;
