import { useState, useEffect } from 'react'
import '../css/ProfilePageNew.css'

const ProfilePage = ({ user, setUser, setToast }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  })
  const [isLoading, setIsLoading] = useState(false)

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

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account details</p>
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
            <div className="user-stats">
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-main">
          <div className="form-card">
            <div className="form-header">
              <h2>Personal Information</h2>
              <p>Update your personal details</p>
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
                  rows="4"
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
        </div>
      </div>
    </div>
  )
}

export default ProfilePage