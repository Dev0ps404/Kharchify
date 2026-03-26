import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiLogIn, FiMail, FiLock, FiPieChart } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-split-wrapper animate-fade-in">
      {/* Left Creative Hero Section */}
      <div className="auth-hero">
        <div className="auth-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '12px', borderRadius: '14px' }}>
              <FiPieChart size={32} color="#60a5fa" />
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>ExpenseTracker</h2>
          </div>
          <h1>Track your wealth.<br />Live your life.</h1>
          <p>Sign in to discover your spending patterns, log daily expenses intuitively, and take total control over your financial freedom today.</p>
        </div>
      </div>
      
      {/* Right Form Section */}
      <div className="auth-form-container">
        <div className="creative-form-box">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '10px' }}>Welcome back</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Enter your credentials to access your dashboard.</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <div className="input-group">
              <label style={{ color: '#cbd5e1', fontWeight: '500' }}>Email Address</label>
              <div className="input-icon-wrapper">
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={onChange} 
                  className="form-input form-input-with-icon creative-input"
                  required 
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="input-group" style={{ marginTop: '25px' }}>
              <label style={{ color: '#cbd5e1', fontWeight: '500' }}>Password</label>
              <div className="input-icon-wrapper">
                <FiLock className="input-icon" />
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={onChange}
                  className="form-input form-input-with-icon creative-input" 
                  required 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-full creative-btn" style={{ marginTop: '35px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <FiLogIn size={20} /> Login to Dashboard
              </span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '25px 0' }}>
              <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
              <span style={{ padding: '0 15px', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>OR</span>
              <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    await googleLogin(credentialResponse.credential);
                    toast.success('Successfully logged in with Google!');
                    navigate('/');
                  } catch (err) {
                    console.error(err);
                    toast.error('Google authentication failed on server.');
                  }
                }}
                onError={() => toast.error('Google popup failed to load')}
                theme="outline"
                size="large"
                shape="pill"
                width="100%"
              />
            </div>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '40px', color: '#94a3b8', fontSize: '1.05rem' }}>
            New to ExpenseTracker? <Link to="/register" style={{ color: '#818cf8', fontWeight: '600' }}>Join for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
