import React from 'react'
import '../css/Navbar.css'

const Navbar = ({ currentPage, setCurrentPage, cartItemCount, isAuthenticated, user, onLogout }) => {
  // Updated navigation items to focus only on shoes
  const navItems = [
    { id: 'shoes', label: 'All Shoes', icon: '👟' },
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'sports', label: 'Sports', icon: '🏀' },
    { id: 'casual', label: 'Casual', icon: '🥾' },
    { id: 'limited', label: 'Limited Edition', icon: '✨' },
  ]

  const handleBrandClick = () => {
    if (isAuthenticated) {
      setCurrentPage('shoes')
    } else {
      setCurrentPage('landing')
    }
  }

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
  }

  const handleCartClick = () => {
    if (isAuthenticated) {
      setCurrentPage('cart')
    } else {
      setCurrentPage('login')
      alert('Please log in to view your cart.')
    }
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setCurrentPage('profile')
    } else {
      setCurrentPage('login')
    }
  }

  return (
    <nav className="vertical-navbar">
      <div className="nav-container">
        {/* Brand Section */}
        <div className="nav-brand" onClick={handleBrandClick}>
          <div className="brand-icon">👟</div>
          <div className="brand-text">ShoeStore</div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {/* Categories - Only show when authenticated */}
          {isAuthenticated && (
            <>
              <div className="nav-section-title">Categories</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </>
          )}

          {/* General Navigation */}
          <div className="nav-section-title">Menu</div>
          {!isAuthenticated && (
            <>
              <button
                className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
                onClick={() => setCurrentPage('landing')}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </button>
              
              {/* Only show Shop button when NOT logged in */}
              <button
                className={`nav-link ${currentPage === 'shoes' ? 'active' : ''}`}
                onClick={() => setCurrentPage('shoes')}
              >
                <span className="nav-icon">👟</span>
                <span className="nav-label">Shop</span>
              </button>
            </>
          )}

          <button
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            <span className="nav-icon">ℹ️</span>
            <span className="nav-label">About Us</span>
          </button>

          {/* Auth Links - Show based on auth status */}
          {!isAuthenticated ? (
            <>
              <button
                className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
                onClick={() => setCurrentPage('login')}
              >
                <span className="nav-icon">🔑</span>
                <span className="nav-label">Login</span>
              </button>
              <button
                className={`nav-link ${currentPage === 'signup' ? 'active' : ''}`}
                onClick={() => setCurrentPage('signup')}
              >
                <span className="nav-icon">📝</span>
                <span className="nav-label">Sign Up</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={handleProfileClick}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </button>
              <button
                className="nav-link"
                onClick={onLogout}
              >
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </>
          )}
          
          {/* User Info - Only show when authenticated */}
          {isAuthenticated && user && (
            <div className="user-info">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Only show when authenticated */}
        {isAuthenticated && (
          <div className="nav-actions">
            <div className="action-buttons">
              <button className="search-btn" title="Search">
                <span>🔍</span>
              </button>
              <button onClick={handleCartClick} className="cart-btn" title="Cart">
                <span>🛒</span>
                <span className="cart-count">{cartItemCount}</span>
              </button>
            </div>
            <button className="contact-btn btn-primary" onClick={() => alert("Contact functionality coming soon!")}>
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar