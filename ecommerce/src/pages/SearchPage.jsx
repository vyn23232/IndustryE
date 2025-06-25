import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
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
      const response = await axios.get('http://localhost:8080/api/products')
      const products = response.data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.category || 'Default',
        rating: 4.8,
        image: product.imageUrl || 'https://via.placeholder.com/200',
        description: product.description,
        category: product.category
      }))
      setAllShoes(products)
      setSearchResults(products)
    } catch (error) {
      console.error('Error fetching products:', error)
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
      
      // Try backend search first
      try {
        const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${encodeURIComponent(query)}`)
        const products = response.data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          color: product.category || 'Default',
          rating: 4.8,
          image: product.imageUrl || 'https://via.placeholder.com/200',
          description: product.description,
          category: product.category
        }))
        setSearchResults(products)
      } catch (backendError) {
        // Fallback to frontend filtering if backend search fails
        console.warn('Backend search failed, using frontend filtering:', backendError)
        if (allShoes.length === 0) {
          await fetchAllProducts()
        }
        
        const filteredResults = allShoes.filter(shoe => 
          shoe.name.toLowerCase().includes(query.toLowerCase()) ||
          shoe.description.toLowerCase().includes(query.toLowerCase()) ||
          shoe.category.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(filteredResults)
      }
    } catch (error) {
      console.error('Error performing search:', error)
      setSearchResults([])
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
    addToCart(shoe, 1)
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
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center&auto=format&fm=webp&q=80`;
                      }}
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
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center&auto=format&fm=webp&q=80`;
                  }}
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
