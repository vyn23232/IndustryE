import { useState } from 'react'
import '../css/ShoesPage.css'

const ShoesPage = ({ addToCart }) => {
  const shoes = [
    { 
      id: 1, 
      name: 'Nike Air Max 270', 
      price: 199, 
      color: 'Orange/Black', 
      rating: 4.8, 
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-270-shoes-2V5C4p.png'
    },
    { 
      id: 2, 
      name: 'Adidas Ultraboost 22', 
      price: 249, 
      color: 'Blue/White', 
      rating: 4.9, 
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Blue_GZ0127_01_standard.jpg'
    },
    { 
      id: 3, 
      name: 'Nike Air Force 1', 
      price: 179, 
      color: 'Triple Black', 
      rating: 4.7, 
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png'
    },
    { 
      id: 4, 
      name: 'New Balance 990v5', 
      price: 229, 
      color: 'Forest Green', 
      rating: 4.6, 
      image: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600'
    },
    { 
      id: 5, 
      name: 'Converse Chuck Taylor', 
      price: 189, 
      color: 'Classic White', 
      rating: 4.7, 
      image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw2f8aa4b6/images/a_107/M7652_A_107X1.jpg?sw=964'
    },
    { 
      id: 6, 
      name: 'Timberland Boots', 
      price: 219, 
      color: 'Wheat Brown', 
      rating: 4.5, 
      image: 'https://assets.timberland.com/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1718961011/TB165030713-HERO/Mens-Direct-Attach-6-Soft-Toe-Waterproof-Work-Boot.png'
    },
    { 
      id: 7, 
      name: 'Vans Old Skool', 
      price: 159, 
      color: 'Navy/White', 
      rating: 4.6, 
      image: 'https://images.vans.com/is/image/Vans/VN000D3HNVY-HERO?$583x583$'
    },
    { 
      id: 8, 
      name: 'Jordan 1 Retro High', 
      price: 239, 
      color: 'Chicago Red', 
      rating: 4.8, 
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/994924a8-be16-4b22-9a7d-9a7d56413264/air-jordan-1-retro-high-og-chicago-reimagined-mens-shoes-Bp44L0.png'
    },
    { 
      id: 9, 
      name: 'Puma RS-X', 
      price: 169, 
      color: 'Red/Black', 
      rating: 4.4, 
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/380462/01/sv01/fnd/PNA/fmt/png/RS-X-Subvert-Men\'s-Sneakers'
    },
    { 
      id: 10, 
      name: 'Balenciaga Triple S', 
      price: 289, 
      color: 'Silver/White', 
      rating: 4.9, 
      image: 'https://www.balenciaga.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-balenciaga-master/default/dw5c2c6a34/images/h17/D17/h17D17013_1000_24_2000x2000.jpg?sw=2000&sh=2000'
    }
  ]

  const [selectedShoe, setSelectedShoe] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openShoeModal = (shoe) => {
    setSelectedShoe(shoe)
    setQuantity(1)
  }

  const closeShoeModal = () => {
    setSelectedShoe(null)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (selectedShoe) {
      addToCart(selectedShoe, quantity)
      closeShoeModal()
    }
  }

  const handleQuickAddToCart = (e, shoe) => {
    e.stopPropagation()
    addToCart(shoe, 1)
  }

  const scrollRight = () => {
    if (currentIndex + 4 < shoes.length) {
      setCurrentIndex(prevIndex => prevIndex + 1)
    }
  }
  
  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1)
    }
  }

  return (
    <div className="shoes-page">
      {/* Hero Section */}
      <section className="shoes-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Summer
                <br />
                <span className="highlight">Collections</span>
                <br />
                <span className="year">2025</span>
              </h1>
              <p className="hero-description">
                The styles of shoe available to consumers are endless and profit also endless
              </p>
              <div className="hero-actions">
                <button className="btn-primary shop-now-btn">
                  Shop Now →
                </button>
                <div className="rating-section">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <div className="rating-text">
                    <span className="rating-score">4.9</span>
                    <span className="rating-count">120k Total Review</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="main-shoe">
                <img 
                  src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-270-shoes-2V5C4p.png" 
                  alt="Featured Nike Air Max 270" 
                  style={{width: '200px', height: '200px', objectFit: 'contain'}}
                />
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

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular <span className="highlight">Products</span></h2>
            <div className="nav-arrows">
              <button 
                className={`arrow-btn ${currentIndex === 0 ? 'disabled' : ''}`}
                onClick={scrollLeft}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              <button 
                className={`arrow-btn ${currentIndex + 4 >= shoes.length ? 'disabled' : ''}`}
                onClick={scrollRight}
                disabled={currentIndex + 4 >= shoes.length}
              >
                →
              </button>
            </div>
          </div>
          
          <div className="products-slider-container">
            <div 
              className="products-slider" 
              style={{ 
                transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 30}px))`,
              }}
            >
              {shoes.map((shoe) => (
                <div 
                  key={shoe.id} 
                  className="product-card"
                  onClick={() => openShoeModal(shoe)}
                >
                  <div className="product-image">
                    <img 
                      src={shoe.image} 
                      alt={shoe.name}
                      style={{
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        // Fallback image if the main image fails to load
                        e.target.src = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center&auto=format&fm=webp&q=80`;
                      }}
                    />
                    <button 
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when wishlist is clicked
                      }}
                    >
                      ♡
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{shoe.name}</h3>
                    <p className="product-color">Color: {shoe.color}</p>
                    <div className="product-rating">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-value">({shoe.rating})</span>
                    </div>
                    <div className="product-price">${shoe.price}</div>
                    <button 
                      className="add-to-cart-btn btn-primary"
                      onClick={(e) => handleQuickAddToCart(e, shoe)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="products-pagination">
            {Array.from({ length: Math.ceil(shoes.length / 4) }).map((_, index) => (
              <button 
                key={index} 
                className={`pagination-dot ${currentIndex === index * 4 ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index * 4)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedShoe && (
        <div className="modal-overlay" onClick={closeShoeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeShoeModal}>×</button>
            <div className="modal-content">
              <div className="modal-product-image">
                <img 
                  src={selectedShoe.image} 
                  alt={selectedShoe.name}
                  style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                  onError={(e) => {
                    // Fallback image if the main image fails to load
                    e.target.src = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center&auto=format&fm=webp&q=80`;
                  }}
                />
              </div>
              <div className="modal-product-info">
                <h2 className="modal-product-name">{selectedShoe.name}</h2>
                <p className="modal-product-id">Reference ID: {selectedShoe.id}</p>
                <p className="modal-product-color">Color: {selectedShoe.color}</p>
                <div className="modal-product-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-value">({selectedShoe.rating})</span>
                </div>
                <div className="modal-product-price">${selectedShoe.price}</div>
                <p className="modal-product-description">
                  Experience ultimate comfort and style with our premium {selectedShoe.color.toLowerCase()} 
                  {selectedShoe.name} shoes. Perfect for everyday wear, sports, and active lifestyles.
                </p>
                <div className="modal-actions">
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                  </div>
                  <button 
                    className="modal-add-to-cart btn-primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoesPage