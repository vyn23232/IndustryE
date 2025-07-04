import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/LandingPage.css'
import FeatureCard from '../components/FeatureCard'
import TestimonialCard from '../components/TestimonialCard'
import landingImage from '../assets/images/landingimage.jpg'

const LandingPage = () => {
  const navigate = useNavigate()
  // Updated features for a shoe store
  const features = [
    {
      icon: '🔍',
      title: 'Wide Selection',
      description: 'Explore our vast collection of shoes from top brands and designers for every occasion.'
    },
    {
      icon: '🛠️',
      title: 'Quality Craftsmanship',
      description: 'Each pair is made with precision and care, ensuring durability and comfort.'
    },
    {
      icon: '✅',
      title: 'Perfect Fit',
      description: 'Our sizing guide helps you find the perfect fit for your feet.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick shipping to get your new shoes to your doorstep as soon as possible.'
    }
  ]

  // Updated testimonials for a shoe store
  const testimonials = [
    {
      name: 'John Smith',
      rating: 5,
      comment: 'The running shoes I bought are the most comfortable I\'ve ever worn. Great quality!',
      avatar: '🧔'
    },
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing selection of athletic shoes. Found exactly what I needed for my marathon training.',
      avatar: '👩'
    },
    {
      name: 'Mike Rodriguez',
      rating: 4,
      comment: 'Great prices and fast delivery. My go-to store for all my footwear needs!',
      avatar: '👨‍💻'
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
                <span className="highlight">ShoeStop</span>
              </h1>
              <p className="hero-description">
                Your ultimate shopping destination with endless possibilities. 
                Discover amazing products across all categories with unbeatable prices 
                and exceptional service.
              </p>
              <div className="hero-actions">
                <Link to="/signup" className="btn-primary cta-btn">
                  Get Started →
                </Link>
                <Link to="/shoes" className="btn-secondary">
                  Browse Collection
                </Link>

              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Shoe Models</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50k+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9</div>
                  <div className="stat-label">Customer Rating</div>
                </div>
              </div>
            </div>
            <div className="hero-image" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={landingImage} 
                alt="ShoeStop Hero" 
                style={{ 
                  width: '420px', 
                  height: 'auto', 
                  borderRadius: '32px', 
                  boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
                  objectFit: 'cover',
                  border: '4px solid #fff',
                  background: '#fff',
                  zIndex: 1
                }}
              />
              {/* Decorative gradient circle */}
              <div style={{
                position: 'absolute',
                left: '-60px',
                top: '40%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle at 60% 40%, #ff6b35 0%, #f7931e 80%, transparent 100%)',
                borderRadius: '50%',
                opacity: 0.18,
                zIndex: 0
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose <span className="highlight">ShoeStop</span>?</h2>
            <p>Experience the difference with our premium shopping platform</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our <span className="highlight">Customers</span> Say</h2>
            <p>Join thousands of satisfied shoe enthusiasts worldwide</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Join ShoeStop today and discover amazing deals on your favorite products</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary cta-btn">
                Create Account
              </Link>
              <Link to="/about" className="btn-secondary explore-btn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage