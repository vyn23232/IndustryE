import React from 'react'

const ProductGrid = ({ products, onViewProduct, onAddToCart, gridColumns = 3 }) => {
  if (!products || products.length === 0) return null

  return (
    <div 
      className="product-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '2rem',
        padding: '2rem 0'
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="product-grid-card"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => onViewProduct(product)}
        >
          <div className="product-image-container" style={{ position: 'relative' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover'
              }}
            />
            <div 
              className="product-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>
          
          <div className="product-details" style={{ padding: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              marginBottom: '0.5rem',
              color: '#fff'
            }}>
              {product.name}
            </h3>
            
            <p style={{ 
              color: '#b3b3b3', 
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {product.category} • {product.color}
            </p>
            
            <div className="product-rating" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span style={{ color: '#b3b3b3', fontSize: '0.85rem' }}>
                ({product.rating})
              </span>
            </div>
            
            <div className="price-and-actions" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <div className="price" style={{ 
                fontSize: '1.4rem', 
                fontWeight: 700, 
                color: '#ff6b35'
              }}>
                ₱{parseFloat(product.price).toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </div>
              
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart && onAddToCart(product)
                }}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid
