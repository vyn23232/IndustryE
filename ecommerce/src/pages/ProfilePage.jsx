import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/ProfilePageNew.css'

const ProfilePage = ({ user, setUser, setToast, onLogout }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState({})

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear specific error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setToast({
          message: 'Please log in to update your profile',
          type: 'error'
        })
        return
      }

      const response = await fetch('http://localhost:8080/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedUser = await response.json()
        
        // Update localStorage with new user data
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
        const newUserData = { ...currentUser, ...updatedUser }
        localStorage.setItem('user', JSON.stringify(newUserData))

        // Update parent component's user state
        if (setUser) {
          setUser(newUserData)
        }

        setToast({
          message: 'Profile updated successfully!',
          type: 'success'
        })
      } else {
        const errorData = await response.json()
        setToast({
          message: errorData.message || 'Failed to update profile',
          type: 'error'
        })
      }
    } catch (error) {
      setToast({
        message: 'Connection error. Please try again.',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validatePasswordForm = () => {
    const errors = {}
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters'
    }
    
    if (!passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match'
    }
    
    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!validatePasswordForm()) {
      return
    }
    
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setToast({
          message: 'Please log in to change your password',
          type: 'error'
        })
        return
      }

      const response = await fetch('http://localhost:8080/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setToast({
          message: 'Password changed successfully!',
          type: 'success'
        })
      } else {
        const errorData = await response.json()
        setToast({
          message: errorData.message || 'Failed to change password',
          type: 'error'
        })
      }
    } catch (error) {
      setToast({
        message: 'Connection error. Please try again.',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setShowLogoutModal(false)
    if (onLogout) {
      onLogout()
    }
    navigate('/')
  }

  const confirmLogout = () => {
    setShowLogoutModal(true)
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My ShoeStop Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="profile-content">
        {/* User Info Card */}
        <div className="profile-sidebar">
          <div className="user-card">
            <div className="avatar">
              {userInitial}
            </div>
            <h3 className="user-name">{user?.name || 'User Name'}</h3>
            <p className="user-email">{user?.email || 'user@example.com'}</p>
          </div>

          {/* Navigation Menu */}
          <div className="profile-menu">
            <button 
              className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="menu-icon">👤</span>
              Personal Info
            </button>
            <button 
              className={`menu-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="menu-icon">🔒</span>
              Security
            </button>
            <button 
              className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="menu-icon">⚙️</span>
              Settings
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Personal Information Tab */}
          {activeTab === 'profile' && (
            <div className="form-card">
              <div className="form-header">
                <h2>Personal Information</h2>
                <p>Update your account details</p>
              </div>
              
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us a bit about yourself"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="form-card">
              <div className="form-header">
                <h2>Security Settings</h2>
                <p>Manage your password and account security</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    className={passwordErrors.currentPassword ? 'error' : ''}
                  />
                  {passwordErrors.currentPassword && (
                    <span className="error-message">{passwordErrors.currentPassword}</span>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className={passwordErrors.newPassword ? 'error' : ''}
                    />
                    {passwordErrors.newPassword && (
                      <span className="error-message">{passwordErrors.newPassword}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className={passwordErrors.confirmNewPassword ? 'error' : ''}
                    />
                    {passwordErrors.confirmNewPassword && (
                      <span className="error-message">{passwordErrors.confirmNewPassword}</span>
                    )}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="form-card">
              <div className="form-header">
                <h2>Account Settings</h2>
                <p>Manage your account preferences and data</p>
              </div>
              
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Account Information</h4>
                    <p>View and manage your basic account details</p>
                  </div>
                  <button 
                    className="setting-btn secondary"
                    onClick={() => setActiveTab('profile')}
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Password & Security</h4>
                    <p>Update your password and security settings</p>
                  </div>
                  <button 
                    className="setting-btn secondary"
                    onClick={() => setActiveTab('security')}
                  >
                    Manage Security
                  </button>
                </div>
                
                <div className="setting-item danger">
                  <div className="setting-info">
                    <h4>Sign Out</h4>
                    <p>Sign out from your account on this device</p>
                  </div>
                  <button 
                    className="setting-btn danger"
                    onClick={confirmLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content logout-modal">
            <div className="modal-header">
              <h3>Confirm Sign Out</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to sign out? Your cart items will be saved for when you return.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage