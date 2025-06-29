import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = ({ cartItemCount, isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const handleBrandClick = () => {
    if (isAuthenticated) {
      navigate('/shoes')
    } else {
      navigate('/')
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  const handleSearchClick = () => {
    navigate('/search')
  }

  return (
    <nav className="vertical-navbar">
      <div className="nav-container">
        {/* Brand Section */}
        <div className="nav-brand" onClick={handleBrandClick}>
          <div className="brand-icon">🛍️</div>
          <div className="brand-text">ShoeStop</div>
        </div>

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
        {/* Navigation Links */}
        <div className="nav-links">
          {/* General Navigation */}
          <div className="nav-section-title">Menu</div>
          {!isAuthenticated && (
            <>
              <Link
                to="/"
                className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </Link>
            </>
          )}

          <Link
            to="/shoes"
            className={`nav-link ${currentPath === '/shoes' ? 'active' : ''}`}
          >
            <span className="nav-icon">👟</span>
            <span className="nav-label">Shoes</span>
          </Link>

          <Link
            to="/about"
            className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}
          >
            <span className="nav-icon">ℹ️</span>
            <span className="nav-label">About Us</span>
          </Link>

          {/* Auth Links - Show based on auth status */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`nav-link ${currentPath === '/login' ? 'active' : ''}`}
              >
                <span className="nav-icon">🔑</span>
                <span className="nav-label">Login</span>
              </Link>
              <Link
                to="/signup"
                className={`nav-link ${currentPath === '/signup' ? 'active' : ''}`}
              >
                <span className="nav-icon">📝</span>
                <span className="nav-label">Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <button
                className={`nav-link ${currentPath === '/profile' ? 'active' : ''}`}
                onClick={handleProfileClick}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </button>
              <Link
                to="/orders"
                className={`nav-link ${currentPath === '/orders' ? 'active' : ''}`}
              >
                <span className="nav-icon">📦</span>
                <span className="nav-label">My Orders</span>
              </Link>
              
              <button
                className="nav-link"
                onClick={onLogout}
              >
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Action Buttons - Only show when authenticated */}
        {isAuthenticated && (
          <div className="nav-actions">
            <div className="action-buttons">
              <button className="search-btn" title="Search" onClick={handleSearchClick}>
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