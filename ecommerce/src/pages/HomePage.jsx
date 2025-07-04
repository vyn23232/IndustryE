import { useEffect } from 'react'
import '../css/HomePage.css'
import CategoryCard from '../components/CategoryCard'

const HomePage = ({ setCurrentPage }) => {
  // Since we're only selling shoes, redirect to shoes page
  useEffect(() => {
    setCurrentPage('shoes')
  }, [setCurrentPage])
  


  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'shoes') {
      setCurrentPage('shoes')
    } else {
      // For other categories, you can add alerts or placeholder behavior
      alert(`${categories.find(cat => cat.id === categoryId)?.name} section coming soon!`)
    }
  }

  const handleCartClick = () => {
    if (categoryId === 'cart') {
      setCurrentPage('shoes')
    } else {
      // For other categories, you can add alerts or placeholder behavior
      alert(`${categories.find(cat => cat.id === categoryId)?.name} section coming soon!`)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Multi-Category
                <br />
                <span className="highlight">Collections</span>
                <br />
              </h1>
              <p className="hero-description">
                The ultimate shopping destination where every category meets endless possibilities and profit also endless
              </p>
              <div className="hero-actions">
                <button className="btn-primary shop-now-btn" onClick={() => handleCategoryClick('shoes')}>
                  Shop Now →
                </button>
                <div className="rating-section">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <div className="rating-text">
                    <span className="rating-score">4.9</span>
                    <span className="rating-count">120k Total Reviews</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="product-showcase">
                <div className="main-product">
                  <span style={{fontSize: '120px'}}>🛍️</span>
                </div>
                <div className="floating-elements">
                  <div className="floating-item" style={{top: '20%', right: '20%'}}>💻</div>
                  <div className="floating-item" style={{top: '60%', left: '10%'}}>🎵</div>
                  <div className="floating-item" style={{bottom: '30%', right: '40%'}}>🎮</div>
                </div>
              </div>
              <div className="discount-badge">
                <div className="discount-text">
                  <span>Get up to 30% off</span>
                  <small>You can get up to 30 percent discount from here</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular <span className="highlight">Categories</span></h2>
            <div className="nav-arrows">
              <button className="arrow-btn">←</button>
              <button className="arrow-btn">→</button>
            </div>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage