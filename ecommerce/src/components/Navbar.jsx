import '../css/Navbar.css'

// Updated Navbar component with conditional authentication-based navigation
const Navbar = ({ currentPage, setCurrentPage, cartItemCount = 0, isAuthenticated, user, onLogout }) => {
  const navItems = [
    { id: 'electronics', label: 'Electronics', icon: '📱' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'shoes', label: 'Shoes', icon: '👟' },
    { id: 'home-garden', label: 'Home & Garden', icon: '🏠' },
    { id: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'beauty', label: 'Beauty & Health', icon: '💄' },
    { id: 'automotive', label: 'Automotive', icon: '🚗' },
    { id: 'toys', label: 'Toys & Games', icon: '🎮' },
    { id: 'jewelry', label: 'Jewelry', icon: '💎' }
  ]

  // Separate navigation for public and auth pages
  const publicPages = [
    { id: 'about', label: 'About Us', icon: 'ℹ️' }
  ]

  const authPages = [
    { id: 'login', label: 'Login', icon: '🔑' },
    { id: 'signup', label: 'Sign Up', icon: '👤' },
    { id: 'cart', label: 'Cart', icon: '🛒' }
  ]

  const handleBrandClick = () => {
    if (isAuthenticated) {
      setCurrentPage('home')
    } else {
      setCurrentPage('landing')
    }
  }

  const  handleCartClick = () => {
    if (isAuthenticated) {
      setCurrentPage('cart')
    } else {
      alert('Please log in to view your cart.')
    }
  }
  // END NEW CODE: Separate navigation

  return (
    <nav className="vertical-navbar">
      <div className="nav-container">
        {/* Brand Section */}
        <div className="nav-brand" onClick={handleBrandClick}>
          <div className="brand-icon">🛍️</div>
          <div className="brand-text">MultiStore</div>
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
                  onClick={() => setCurrentPage(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </>
          )}
          {/* END NEW CODE: Conditional categories */}

          {/* Public Pages */}
          <div className="nav-section-title" style={{marginTop: isAuthenticated ? '20px' : '0px'}}>
            Pages
          </div>
          {publicPages.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}

          {/* Authentication Pages - Only show when not authenticated */}
          {!isAuthenticated && (
            <>
              <div className="nav-section-title" style={{marginTop: '20px'}}>Account</div>
              {authPages.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </>
          )}

          {/* User Info and Logout - Only show when authenticated */}
          {isAuthenticated && (
            <>
              <div className="nav-section-title" style={{marginTop: '20px'}}>Account</div>
              <div className="user-info">
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
              </div>
              <button
                className="nav-link logout-btn"
                onClick={onLogout}
              >
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </>
          )}
          {/* END NEW CODE: User info and logout */}
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
            <button className="contact-btn btn-primary">
              Contact Us
            </button>
          </div>
        )}
        {/* END NEW CODE: Conditional action buttons */}
      </div>
    </nav>
  )
}

export default Navbar