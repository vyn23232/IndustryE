import '../css/LandingPage.css'

const LandingPage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: '🛍️',
      title: 'Wide Selection',
      description: 'Browse through thousands of products across 10+ categories'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with express delivery options'
    },
    {
      icon: '🔒',
      title: 'Secure Shopping',
      description: 'Your data and transactions are protected with advanced security'
    },
    {
      icon: '💯',
      title: 'Quality Guarantee',
      description: '30-day return policy and 100% satisfaction guarantee'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing shopping experience! Fast delivery and great quality products.',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Best prices and excellent customer service. Highly recommended!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Love the variety of products available. My go-to shopping destination.',
      avatar: '👩‍🎨'
    }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to
                <br />
                <span className="highlight">MultiStore</span>
              </h1>
              <p className="hero-description">
                Your ultimate shopping destination with endless possibilities. 
                Discover amazing products across all categories with unbeatable prices 
                and exceptional service.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn-primary cta-btn"
                  onClick={() => setCurrentPage('signup')}
                >
                  Get Started →
                </button>
                <button 
                  className="btn-secondary login-btn"
                  onClick={() => setCurrentPage('login')}
                >
                  Already a member? Login
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="product-showcase">
                <div className="main-product">
                  <span style={{fontSize: '150px'}}>🛍️</span>
                </div>
                <div className="floating-elements">
                  <div className="floating-item" style={{top: '10%', right: '15%'}}>💻</div>
                  <div className="floating-item" style={{top: '70%', left: '5%'}}>👟</div>
                  <div className="floating-item" style={{bottom: '20%', right: '35%'}}>📱</div>
                  <div className="floating-item" style={{top: '40%', left: '20%'}}>🎮</div>
                </div>
              </div>
              <div className="discount-badge">
                <div className="discount-text">
                  <span>Up to 50% OFF</span>
                  <small>On your first purchase</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose <span className="highlight">MultiStore</span>?</h2>
            <p>Experience the difference with our premium shopping platform</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our <span className="highlight">Customers</span> Say</h2>
            <p>Join thousands of satisfied customers worldwide</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-comment">"{testimonial.comment}"</p>
                <div className="testimonial-author">
                  <span className="author-avatar">{testimonial.avatar}</span>
                  <span className="author-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Join MultiStore today and discover amazing deals on your favorite products</p>
            <div className="cta-actions">
              <button 
                className="btn-primary cta-btn"
                onClick={() => setCurrentPage('signup')}
              >
                Create Account
              </button>
              <button 
                className="btn-secondary explore-btn"
                onClick={() => setCurrentPage('about')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage