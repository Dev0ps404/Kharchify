import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUserPlus, FiUser, FiMail, FiLock, FiPieChart } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          <h1>Start your journey<br />to saving more.</h1>
          <p>Create an account to unlock powerful analytics and understand exactly where your hard-earned money goes every month.</p>
        </div>
      </div>
      
      {/* Right Form Section */}
      <div className="auth-form-container">
        <div className="creative-form-box">
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#f8fafc', marginBottom: '10px' }}>Create Account</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Sign up securely in less than a minute.</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <div className="input-group">
              <label style={{ color: '#cbd5e1', fontWeight: '500' }}>Username</label>
              <div className="input-icon-wrapper">
                <FiUser className="input-icon" />
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={onChange} 
                  className="form-input form-input-with-icon creative-input"
                  required 
                  placeholder="CreativeName123"
                />
              </div>
            </div>
            
            <div className="input-group" style={{ marginTop: '20px' }}>
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
                  placeholder="hello@example.com"
                />
              </div>
            </div>
            
            <div className="input-group" style={{ marginTop: '20px' }}>
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
                  minLength="6"
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-full creative-btn" style={{ marginTop: '35px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <FiUserPlus size={20} /> Join ExpenseTracker
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
                    toast.success('Successfully registered via Google!');
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
          
          <p style={{ textAlign: 'center', marginTop: '30px', color: '#94a3b8', fontSize: '1.05rem' }}>
            Already registered? <Link to="/login" style={{ color: '#818cf8', fontWeight: '600' }}>Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
