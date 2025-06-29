import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { mapProductsWithImages } from '../utils/imageMapper'
import axios from 'axios'
import '../css/AllShoes.css'

const Shoes = ({ addToCart, isAuthenticated, user }) => {
  const [shoes, setShoes] = useState([])
  const [allShoes, setAllShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Available categories
  const categories = [
    { key: 'all', label: 'All Shoes' },
    { key: 'running', label: 'Running' },
    { key: 'sports', label: 'Sports' },
    { key: 'casual', label: 'Casual' },
    { key: 'limited', label: 'Limited Edition' }
  ]

  // Fetch products from local data
  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle category filtering and search from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    
    if (searchParam) {
      setSearchQuery(searchParam)
      setActiveCategory('all') // Reset category when searching
    } else if (categoryParam && categories.find(cat => cat.key === categoryParam)) {
      setActiveCategory(categoryParam)
      setSearchQuery('') // Reset search when filtering by category
    } else {
      setActiveCategory('all')
      setSearchQuery('')
    }
  }, [searchParams])

  // Filter shoes based on active category and search query
  useEffect(() => {
    let filteredShoes = allShoes

    if (searchQuery) {
      // If there's a search query, filter by name (case insensitive)
      filteredShoes = allShoes.filter(shoe => 
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else if (activeCategory !== 'all') {
      // If no search but has category filter
      filteredShoes = allShoes.filter(shoe => shoe.category === activeCategory)
    }

    setShoes(filteredShoes)
    setCurrentIndex(0) // Reset slider position when filtering changes
  }, [activeCategory, allShoes, searchQuery])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Fetch products from backend API
      const response = await axios.get('http://localhost:8080/api/products')
      
      // Map backend data with local images
      const productsWithImages = mapProductsWithImages(response.data)
      setAllShoes(productsWithImages)
    } catch (error) {
      console.error('Error loading products from backend:', error)
      // Fallback to empty array or show error message
      setAllShoes([])
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categoryKey) => {
    setActiveCategory(categoryKey)
    if (categoryKey === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryKey })
    }
    setSearchQuery('') // Clear search when changing category
  }

  const handleViewProduct = (shoe) => {
    // Navigate to detail page for size selection and add to cart
    navigate(`/shoes/${shoe.id}`)
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
      {/* Header with Category Filters */}
      <section className="shoes-header">
        <div className="container">
          <div className="header-content">
            <div className="page-title">
              <h1>
                {searchQuery ? (
                  <>Search Results for "{searchQuery}"</>
                ) : (
                  <>
                    {activeCategory === 'all' 
                      ? 'All Shoes' 
                      : categories.find(cat => cat.key === activeCategory)?.label || 'Shoes'
                    }
                  </>
                )}
              </h1>
              <p className="results-count">
                {searchQuery 
                  ? `${shoes.length} result${shoes.length !== 1 ? 's' : ''} found`
                  : `${shoes.length} product${shoes.length !== 1 ? 's' : ''} available`
                }
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.key}
                  className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search Results Clear Button */}
            {searchQuery && (
              <div className="search-actions">
                <button 
                  className="clear-search-btn"
                  onClick={() => {
                    setSearchParams({})
                    setSearchQuery('')
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {searchQuery 
                ? `Search Results` 
                : activeCategory === 'all' 
                  ? 'Featured' 
                  : categories.find(cat => cat.key === activeCategory)?.label || 'Featured'
              } 
              <span className="highlight"> Products</span>
            </h2>
            {!loading && shoes.length > 0 && (
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
            )}
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading products...</p>
            </div>
          ) : shoes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {searchQuery ? (
                <div>
                  <p>No products found for "{searchQuery}"</p>
                  <p>Try searching for different keywords or browse our categories above.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSearchParams({})
                      setSearchQuery('')
                    }}
                    style={{ marginTop: '1rem' }}
                  >
                    Browse All Products
                  </button>
                </div>
              ) : (
                <p>No products available in local data.</p>
              )}
            </div>
          ) : (
            <>
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
                      onClick={() => handleViewProduct(shoe)}
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
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{shoe.name}</h3>
                        <p className="product-color">Color: {shoe.color}</p>
                        <div className="product-rating">
                          <span className="stars">⭐⭐⭐⭐⭐</span>
                          <span className="rating-value">({shoe.rating})</span>
                        </div>
                        <div className="product-price">₱{shoe.price}</div>
                        {/* Always show View button - authentication check happens on details page */}
                        <button 
                          className="view-product-btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProduct(shoe);
                          }}
                        >
                          View Details
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shoes
