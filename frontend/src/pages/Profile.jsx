import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiSave, FiUser } from 'react-icons/fi';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    monthlyBudget: user?.monthlyBudget || 0
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        username: formData.username,
        monthlyBudget: Number(formData.monthlyBudget)
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account settings and set your monthly budget goal.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }} referrerPolicy="no-referrer" />
          ) : (
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px', 
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 'bold', color: 'white',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
            }}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 style={{ margin: 0 }}>{user?.username}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '5px 0 0 0' }}>{user?.email}</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label>Display Name</label>
            <div className="input-icon-wrapper">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={onChange} 
                className="form-input form-input-with-icon"
                required 
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}  
              className="form-input"
              disabled 
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
              title="Email cannot be changed"
            />
          </div>

          <div className="input-group" style={{ marginTop: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Financial Goals</h3>
            <label>Monthly Budget Limit (₹)</label>
            <input 
              type="number" 
              name="monthlyBudget" 
              value={formData.monthlyBudget} 
              onChange={onChange}
              className="form-input" 
              min="0" step="1"
              placeholder="e.g. 10000"
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px' }}>
              Set a monthly limit to track your remaining allowance on the dashboard.
            </p>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Save Profile Settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
