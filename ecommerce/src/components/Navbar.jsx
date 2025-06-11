import '../css/Navbar.css'

const Navbar = ({ currentPage, setCurrentPage, cartItemCount = 0 }) => {
  const navItems = [
    { id: 'pc-parts', label: 'PC Parts', icon: '🖥️' },
    { id: 'concert-tickets', label: 'Concert Tickets', icon: '🎵' },
    { id: 'shoes', label: 'Shoes', icon: '👟' },
    { id: 'game-items', label: 'Game Items', icon: '🎮' },
    { id: 'drugs', label: 'Health & Wellness', icon: '💊' }
  ]

  return (
    <nav className="vertical-navbar">
      <div className="nav-container">
        {/* Brand Section */}
        <div className="nav-brand" onClick={() => setCurrentPage('home')}>
          <div className="brand-icon">🛍️</div>
          <div className="brand-text">MultiStore</div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
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
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button className="action-btn search-btn" title="Search">
            <span>🔍</span>
          </button>
          <button className="action-btn cart-btn" title="Cart">
            <span>🛒</span>
            <span className="cart-count">{cartItemCount}</span>
          </button>
          <button className="contact-btn btn-primary">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar