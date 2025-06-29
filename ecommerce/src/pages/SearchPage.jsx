import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { mapProductsWithImages } from '../utils/imageMapper'
import axios from 'axios'
import '../css/SearchPage.css'

const SearchPage = ({ addToCart, isAuthenticated }) => {
  const [searchResults, setSearchResults] = useState([])
  const [allShoes, setAllShoes] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedShoe, setSelectedShoe] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  // Get search query from URL params
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    } else {
      // If no search query, fetch all products
      fetchAllProducts()
    }
  }, [searchParams])

  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      // Fetch products from backend API
      const response = await axios.get('http://localhost:8080/api/products')
      
      // Map backend data with local images
      const productsWithImages = mapProductsWithImages(response.data)
      setAllShoes(productsWithImages)
      setSearchResults(productsWithImages)
    } catch (error) {
      console.error('Error loading products from backend:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(allShoes)
      return
    }

    try {
      setLoading(true)
      
      // Use backend search endpoint
      const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${encodeURIComponent(query)}`)
      const searchResults = mapProductsWithImages(response.data)
      setSearchResults(searchResults)
    } catch (error) {
      console.error('Error performing search:', error)
      // Fallback to local filtering if backend search fails
      if (allShoes.length === 0) {
        await fetchAllProducts()
      }
      
      const filteredResults = allShoes.filter(shoe => 
        shoe.name.toLowerCase().includes(query.toLowerCase()) ||
        shoe.description.toLowerCase().includes(query.toLowerCase()) ||
        shoe.category.toLowerCase().includes(query.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredResults)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() })
    } else {
      setSearchParams({})
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSearchParams({})
  }

  const openShoeModal = (shoe) => {
    // Navigate to detail page instead of opening modal
    navigate(`/shoes/${shoe.id}`)
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
    setSelectedShoe(shoe)
    setSelectedSize('')
    setQuantity(1)
    setShowSizeModal(true)
  }

  const handleSizeModalClose = () => {
    setShowSizeModal(false)
    setSelectedShoe(null)
    setSelectedSize('')
    setQuantity(1)
    setAlertMessage('')
    setAlertType('')
  }

  const handleSizeModalAddToCart = async () => {
    if (!selectedSize) {
      setAlertMessage('Please select a size before adding to cart.')
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage('')
        setAlertType('')
      }, 3000)
      return
    }

    const shoeWithSize = {
      ...selectedShoe,
      selectedSize,
      image: selectedShoe.image
    }

    try {
      await addToCart(shoeWithSize, quantity)
      handleSizeModalClose()
    } catch (error) {
      console.error('Error adding to cart:', error)
      setAlertMessage('Failed to add item to cart. Please try again.')
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage('')
        setAlertType('')
      }, 3000)
    }
  }

  return (
    <div className="search-page">
      {/* Search Header */}
      <section className="search-header">
        <div className="container">
          <div className="search-header-content">
            <h1 className="search-title">
              {searchQuery ? (
                <>
                  Search Results
                  <br />
                  <span className="highlight">"{searchQuery}"</span>
                </>
              ) : (
                <>
                  Search
                  <br />
                  <span className="highlight">ShoeStop</span>
                </>
              )}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for shoes, brands, categories..."
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-btn">
                  <span>🔍</span>
                </button>
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-btn"
                    onClick={handleClearSearch}
                  >
                    <span>✕</span>
                  </button>
                )}
              </div>
              <div className="search-suggestions">
                <p>Popular searches: Running shoes, Nike Air Max, Sports sneakers, Casual wear</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="search-results-section">
        <div className="container">
          {/* Results Info */}
          <div className="results-info">
            <h2>
              {searchQuery 
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `All Products (${searchResults.length})`
              }
            </h2>
            {searchQuery && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                Clear Search
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <p>Searching...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && searchResults.length === 0 && (
            <div className="no-results">
              {searchQuery ? (
                <div>
                  <h3>No products found for "{searchQuery}"</h3>
                  <p>Try searching for different keywords or browse our categories.</p>
                  <button className="btn-primary" onClick={() => navigate('/shoes')}>
                    Browse All Products
                  </button>
                </div>
              ) : (
                <div>
                  <h3>No products available</h3>
                  <p>Please check if the backend is running.</p>
                </div>
              )}
            </div>
          )}

          {/* Results Grid */}
          {!loading && searchResults.length > 0 && (
            <div className="results-grid">
              {searchResults.map((shoe) => (
                <div 
                  key={shoe.id} 
                  className="product-card"
                  onClick={() => openShoeModal(shoe)}
                >
                  <div className="product-image">
                    <img 
                      src={shoe.image} 
                      alt={shoe.name}
                    />
                    <button 
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      ♡
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{shoe.name}</h3>
                    <p className="product-color">Category: {shoe.category}</p>
                    <div className="product-rating">
                      <span className="stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-value">({shoe.rating})</span>
                    </div>
                    <div className="product-price">₱{shoe.price}</div>
                    {isAuthenticated && (
                      <button 
                        className="add-to-cart-btn btn-primary"
                        onClick={(e) => handleQuickAddToCart(e, shoe)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {!isAuthenticated && (
                      <button 
                        className="login-required-btn btn-secondary"
                        onClick={() => navigate('/login')}
                      >
                        Login to Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Size Selection Modal */}
      {showSizeModal && selectedShoe && (
        <div className="modal-overlay" onClick={handleSizeModalClose}>
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleSizeModalClose}>×</button>
            <div className="size-modal-content">
              <div className="size-modal-header">
                <div className="product-preview">
                  <img src={selectedShoe.image} alt={selectedShoe.name} />
                  <div className="product-details">
                    <h3>{selectedShoe.name}</h3>
                    <p className="product-price">₱{selectedShoe.price}</p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="size-selection">
                <h3>Select Size</h3>
                <div className="size-options">
                  {(selectedShoe.sizes || ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']).map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="size-hint">Please select a size</p>
                )}
              </div>

              {/* Quantity Selection */}
              <div className="quantity-selection">
                <h3>Quantity</h3>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Alert Messages */}
              {alertMessage && (
                <div className={`alert-message ${alertType}`}>
                  {alertType === 'error' && '⚠ '}
                  {alertType === 'warning' && '⚠ '}
                  {alertType === 'success' && '✓ '}
                  {alertMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions">
                <button 
                  className="cancel-btn btn-secondary"
                  onClick={handleSizeModalClose}
                >
                  Cancel
                </button>
                <button 
                  className="add-to-cart-btn btn-primary"
                  onClick={handleSizeModalAddToCart}
                  disabled={!selectedSize}
                >
                  Add to Cart - ₱{(selectedShoe.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedShoe && !showSizeModal && (
        <div className="modal-overlay" onClick={closeShoeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeShoeModal}>×</button>
            <div className="modal-content">
              <div className="modal-product-image">
                <img 
                  src={selectedShoe.image} 
                  alt={selectedShoe.name}
                />
              </div>
              <div className="modal-product-info">
                <h2 className="modal-product-name">{selectedShoe.name}</h2>
                <p className="modal-product-id">Reference ID: {selectedShoe.id}</p>
                <p className="modal-product-color">Category: {selectedShoe.category}</p>
                <div className="modal-product-rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-value">({selectedShoe.rating})</span>
                </div>
                <div className="modal-product-price">₱{selectedShoe.price}</div>
                <p className="modal-product-description">
                  Experience ultimate comfort and style with our premium {selectedShoe.category} 
                  {selectedShoe.name} shoes. Perfect for everyday wear, sports, and active lifestyles.
                </p>
                <div className="modal-actions">
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                  </div>
                  {isAuthenticated && (
                    <button 
                      className="modal-add-to-cart btn-primary"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  )}
                  {!isAuthenticated && (
                    <button 
                      className="login-required-btn btn-secondary"
                      onClick={() => navigate('/login')}
                    >
                      Login to Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage
