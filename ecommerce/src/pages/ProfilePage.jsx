import React, { useState, useEffect } from 'react';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [notification, setNotification] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: 'Test',
    lastName: '',
    email: 'test123@gmail.com',
    phone: '+1 (555) 123-4567',
    bio: 'Tech enthusiast and avid online shopper. Love discovering new products and brands.',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    }
  });
  const [avatarImage, setAvatarImage] = useState(null);

  // Handle tab switching
  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      saveProfileData();
    }
    setIsEditing(!isEditing);
  };

  // Save profile data
  const saveProfileData = () => {
    // In a real app, you would send this data to an API
    showNotification('Profile updated successfully!', 'success');
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Change avatar
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'street' || id === 'city' || id === 'state' || id === 'zipCode' || id === 'country') {
      setProfileData({
        ...profileData,
        address: {
          ...profileData.address,
          [id]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [id]: value
      });
    }
  };

  // Add to cart
  const addToCart = () => {
    showNotification('Item added to cart!', 'success');
  };

  // Track order
  const trackOrder = () => {
    showNotification('Redirecting to order tracking...', 'info');
  };

  // Handle settings actions
  const handleSettingAction = () => {
    showNotification('Feature coming soon!', 'info');
  };

  return (
    <div className="profile-container">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="profile-grid">
        {/* Profile Sidebar */}
        <div className="card profile-sidebar">
          <div className="card-content">
            <div className="avatar-container">
              <div className="avatar">
                {avatarImage ? (
                  <img src={avatarImage} alt="Profile" />
                ) : (
                  <span>{profileData.firstName[0]}{profileData.lastName[0]}</span>
                )}
              </div>
              <div className="camera-btn">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={changeAvatar}
                />
                <label htmlFor="avatar-upload" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </label>
              </div>
            </div>

            <h2 className="profile-name">{profileData.firstName} {profileData.lastName}</h2>
            <p className="profile-email">{profileData.email}</p>

            <div className="badge">Premium Member</div>

            <div className="separator"></div>

            <div className="stats">
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Member since Jan 2023</span>
              </div>
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <span>24 orders completed</span>
              </div>
              <div className="stat-item">
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>12 items in wishlist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="card">
          <div className="tabs">
            <div className="tab-list">
              <button 
                className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`} 
                onClick={() => switchTab('personal')}
              >
                Personal
              </button>
              <button 
                className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} 
                onClick={() => switchTab('orders')}
              >
                Orders
              </button>
              <button 
                className={`tab-button ${activeTab === 'wishlist' ? 'active' : ''}`} 
                onClick={() => switchTab('wishlist')}
              >
                Wishlist
              </button>
              <button 
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`} 
                onClick={() => switchTab('settings')}
              >
                Settings
              </button>
            </div>

            {/* Personal Information Tab */}
            <div id="personal-tab" style={{ display: activeTab === 'personal' ? 'block' : 'none' }}>
              <div className="card-header">
                <div className="header-actions">
                  <div>
                    <h3 className="card-title">Personal Information</h3>
                    <p className="card-description">Update your personal details and contact information</p>
                  </div>
                  <button className={`button ${isEditing ? 'button-primary' : 'button-outline'}`} onClick={toggleEdit}>
                    {isEditing ? (
                      <>
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Save Changes
                      </>
                    ) : (
                      <>
                        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="card-content">
                <form id="profile-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">First Name</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="firstName" 
                        value={profileData.firstName} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="lastName" 
                        value={profileData.lastName} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input 
                        className="form-input" 
                        type="email" 
                        id="email" 
                        value={profileData.email} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone</label>
                      <input 
                        className="form-input" 
                        type="tel" 
                        id="phone" 
                        value={profileData.phone} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="bio">Bio</label>
                    <textarea 
                      className="form-input textarea" 
                      id="bio" 
                      value={profileData.bio}
                      disabled={!isEditing}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="separator"></div>

                  <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Address Information</h4>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="street">Street Address</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      id="street" 
                      value={profileData.address.street} 
                      disabled={!isEditing}
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="form-grid form-grid-address">
                    <div className="form-group">
                      <label className="form-label" htmlFor="city">City</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="city" 
                        value={profileData.address.city} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="state">State</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="state" 
                        value={profileData.address.state} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="zipCode">ZIP Code</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="zipCode" 
                        value={profileData.address.zipCode} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="country">Country</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        id="country" 
                        value={profileData.address.country} 
                        disabled={!isEditing}
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Orders Tab */}
            <div id="orders-tab" style={{ display: activeTab === 'orders' ? 'block' : 'none' }}>
              <div className="card-header">
                <h3 className="card-title">Order History</h3>
                <p className="card-description">View and track your recent orders</p>
              </div>
              <div className="card-content">
                <div className="order-item">
                  <div className="order-left">
                    <div className="order-image"></div>
                    <div className="order-details">
                      <h4>ORD-001</h4>
                      <div className="order-meta">3 items • 2024-01-15</div>
                    </div>
                    <span className="status-badge status-delivered">Delivered</span>
                  </div>
                  <div className="order-right">
                    <div className="order-total">$299.99</div>
                    <button className="button button-outline button-sm" onClick={trackOrder}>
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Track Order
                    </button>
                  </div>
                </div>

                <div className="order-item">
                  <div className="order-left">
                    <div className="order-image"></div>
                    <div className="order-details">
                      <h4>ORD-002</h4>
                      <div className="order-meta">2 items • 2024-01-10</div>
                    </div>
                    <span className="status-badge status-transit">In Transit</span>
                  </div>
                  <div className="order-right">
                    <div className="order-total">$149.50</div>
                    <button className="button button-outline button-sm" onClick={trackOrder}>
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Track Order
                    </button>
                  </div>
                </div>

                <div className="order-item">
                  <div className="order-left">
                    <div className="order-image"></div>
                    <div className="order-details">
                      <h4>ORD-003</h4>
                      <div className="order-meta">1 item • 2024-01-05</div>
                    </div>
                    <span className="status-badge status-processing">Processing</span>
                  </div>
                  <div className="order-right">
                    <div className="order-total">$89.99</div>
                    <button className="button button-outline button-sm" onClick={trackOrder}>
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist Tab */}
            <div id="wishlist-tab" style={{ display: activeTab === 'wishlist' ? 'block' : 'none' }}>
              <div className="card-header">
                <h3 className="card-title">My Wishlist</h3>
                <p className="card-description">Items you've saved for later</p>
              </div>
              <div className="card-content">
                <div className="wishlist-grid">
                  <div className="wishlist-item">
                    <div className="wishlist-image"></div>
                    <div className="wishlist-details">
                      <h4 className="wishlist-name">Wireless Headphones</h4>
                      <div className="wishlist-price">$199.99</div>
                      <span className="status-badge" style={{ background: '#dcfce7', color: '#166534' }}>In Stock</span>
                    </div>
                    <div className="wishlist-actions">
                      <button className="button button-primary button-sm" onClick={addToCart}>
                        Add to Cart
                      </button>
                      <button className="button button-outline button-sm">
                        <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="wishlist-item">
                    <div className="wishlist-image"></div>
                    <div className="wishlist-details">
                      <h4 className="wishlist-name">Smart Watch</h4>
                      <div className="wishlist-price">$299.99</div>
                      <span className="status-badge" style={{ background: '#fee2e2', color: '#dc2626' }}>Out of Stock</span>
                    </div>
                    <div className="wishlist-actions">
                      <button className="button button-outline button-sm" disabled>
                        Add to Cart
                      </button>
                      <button className="button button-outline button-sm">
                        <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="wishlist-item">
                    <div className="wishlist-image"></div>
                    <div className="wishlist-details">
                      <h4 className="wishlist-name">Laptop Stand</h4>
                      <div className="wishlist-price">$49.99</div>
                      <span className="status-badge" style={{ background: '#dcfce7', color: '#166534' }}>In Stock</span>
                    </div>
                    <div className="wishlist-actions">
                      <button className="button button-primary button-sm" onClick={addToCart}>
                        Add to Cart
                      </button>
                      <button className="button button-outline button-sm">
                        <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Tab */}
            <div id="settings-tab" style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
              <div className="card-header">
                <h3 className="card-title">Account Settings</h3>
                <p className="card-description">Manage your account preferences and security</p>
              </div>
              <div className="card-content">
                <div className="setting-item">
                  <div className="setting-left">
                    <svg className="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM16 13h4v-2h-4v2zM4 11h12v-2H4v2zM4 5h16V3H4v2z"></path>
                    </svg>
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your orders</p>
                    </div>
                  </div>
                  <button className="button button-outline button-sm" onClick={handleSettingAction}>Configure</button>
                </div>

                <div className="setting-item">
                  <div className="setting-left">
                    <svg className="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <div className="setting-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="button button-outline button-sm" onClick={handleSettingAction}>Enable</button>
                </div>

                <div className="setting-item">
                  <div className="setting-left">
                    <svg className="setting-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <div className="setting-info">
                      <h4>Payment Methods</h4>
                      <p>Manage your saved payment methods</p>
                    </div>
                  </div>
                  <button className="button button-outline button-sm" onClick={handleSettingAction}>Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;