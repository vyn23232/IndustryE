import '../css/AboutPage.css'

const AboutPage = () => {
  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '1M+', label: 'Products Sold' },
    { number: '10+', label: 'Categories' },
    { number: '99%', label: 'Customer Satisfaction' }
  ]

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', emoji: '👩‍💼' },
    { name: 'Mike Chen', role: 'CTO', emoji: '👨‍💻' },
    { name: 'Emily Davis', role: 'Head of Marketing', emoji: '👩‍🎨' },
    { name: 'James Wilson', role: 'Operations Manager', emoji: '👨‍💼' }
  ]

  const values = [
    {
      icon: '⭐',
      title: 'Quality First',
      description: 'We ensure every product meets our high standards before reaching our customers.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your orders to you as fast as possible.'
    },
    {
      icon: '💯',
      title: 'Customer Satisfaction',
      description: 'Your happiness is our priority. We go above and beyond to exceed expectations.'
    },
    {
      icon: '🔒',
      title: 'Secure Shopping',
      description: 'Shop with confidence knowing your data and transactions are protected.'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About <span className="highlight">MultiStore</span></h1>
            <p className="hero-subtitle">
              Your trusted multi-category e-commerce destination, bringing you the best products 
              from electronics to fashion, all in one convenient place.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, MultiStore began as a vision to create the ultimate shopping 
                destination where customers could find everything they need without the hassle 
                of visiting multiple stores.
              </p>
              <p>
                What started as a small team with big dreams has grown into a thriving marketplace 
                serving hundreds of thousands of customers worldwide. We've carefully curated 
                products across 10+ categories to ensure quality, variety, and value.
              </p>
              <p>
                Today, we're proud to be your one-stop shop for electronics, fashion, home goods, 
                and so much more. Our commitment to excellence drives everything we do.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span style={{fontSize: '100px'}}>🏢</span>
                <p>Our Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To revolutionize online shopping by providing a seamless, secure, and satisfying 
              experience that connects customers with the products they love across all categories.
            </p>
            <div className="mission-points">
              <div className="point">
                <span className="point-icon">🎯</span>
                <span>Curate the best products from trusted suppliers</span>
              </div>
              <div className="point">
                <span className="point-icon">🌟</span>
                <span>Deliver exceptional customer service</span>
              </div>
              <div className="point">
                <span className="point-icon">🚀</span>
                <span>Innovate and improve the shopping experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage