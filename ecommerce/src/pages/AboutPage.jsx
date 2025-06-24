import React from 'react'
import '../css/AboutPage.css'

const AboutPage = () => {
  const stats = [
    { number: '10+', label: 'Years in Business' },
    { number: '50k+', label: 'Happy Customers' },
    { number: '500+', label: 'Shoe Models' },
    { number: '100+', label: 'Brand Partners' }
  ]

  const values = [
    {
      icon: '👞',
      title: 'Quality',
      description: 'We only source the highest quality footwear from trusted manufacturers and brands.'
    },
    {
      icon: '🌟',
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from selection to service.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building trust with our customers is at the core of everything we do.'
    },
    {
      icon: '♻️',
      title: 'Sustainability',
      description: 'We\'re committed to environmentally friendly practices and sustainable footwear options.'
    }
  ]

  const team = [
    { name: 'Robert Miller', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Emma Watson', role: 'Head of Design', emoji: '👩‍🎨' },
    { name: 'John Garcia', role: 'Customer Experience', emoji: '👨‍💻' },
    { name: 'Lisa Chen', role: 'Supply Chain Manager', emoji: '👩‍🔧' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About <span className="highlight">ShoeStore</span></h1>
            <p className="hero-subtitle">
              Your trusted footwear destination, bringing you the best shoes
              from casual to athletic, all in one convenient place.
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
                Founded in 2013, ShoeStore began as a vision to create the ultimate shoe shopping
                destination where customers could find the perfect footwear for any occasion
                without compromising on quality, style, or comfort.
              </p>
              <p>
                What started as a small boutique with a handful of premium shoe brands has grown into
                a thriving online marketplace serving customers worldwide. We've carefully curated
                our collection to ensure that every pair of shoes we sell meets our high standards.
              </p>
              <p>
                Today, we're proud to offer an extensive selection of footwear, from running shoes and
                athletic trainers to formal dress shoes, casual everyday options, and stylish boots.
                Our commitment to quality and customer satisfaction drives everything we do.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span style={{fontSize: '100px'}}>👟</span>
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
              To provide exceptional footwear that combines style, comfort, and durability,
              while offering an unparalleled shopping experience that keeps customers coming back.
            </p>
            <div className="mission-points">
              <div className="point">
                <span className="point-icon">🎯</span>
                <span>Curate the best shoes from trusted brands worldwide</span>
              </div>
              <div className="point">
                <span className="point-icon">🌟</span>
                <span>Deliver exceptional customer service and sizing advice</span>
              </div>
              <div className="point">
                <span className="point-icon">🚀</span>
                <span>Innovate and improve the shoe shopping experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage