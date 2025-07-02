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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: 420,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)",
                        borderRadius: 20,
                        padding: 0,
                        transition: "all 0.3s ease",
                        border: "1px solid rgba(255,255,255,0.1)",
                        position: "relative",
                        cursor: "pointer",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        margin: "0 0 24px 0"
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          padding: 0,
                          margin: 0,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          overflow: "hidden"
                        }}
                      >
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            background: "transparent",
                            borderRadius: 0,
                            transition: "transform 0.3s"
                          }}
                        />
                      </div>
                      <div
                        className="product-info"
                        style={{
                          flex: 1,
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          textAlign: "center",
                          padding: "1.5rem 1rem 1.5rem 1rem",
                          background: "transparent"
                        }}
                      >
                        <h3
                          className="product-name"
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            marginBottom: 8
                          }}
                        >
                          {shoe.name}
                        </h3>
                        <p
                          className="product-color"
                          style={{
                            color: "#b3b3b3",
                            marginBottom: 12
                          }}
                        >
                          Color: {shoe.color}
                        </p>
                        <div
                          className="product-rating"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginBottom: 16
                          }}
                        >
                          <span className="stars">⭐⭐⭐⭐⭐</span>
                          <span
                            className="rating-value"
                            style={{
                              color: "#b3b3b3",
                              fontSize: "0.9rem"
                            }}
                          >
                            ({shoe.rating})
                          </span>
                        </div>
                        <div
                          className="product-price"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#ff6b35",
                            marginBottom: 20
                          }}
                        >
                          ₱{shoe.price}
                        </div>
                        <button
                          className="view-product-btn btn-primary"
                          style={{
                            width: "100%",
                            padding: 12,
                            fontWeight: 600,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                            color: "#fff",
                            border: "none",
                            marginTop: "auto",
                            transition: "background 0.3s"
                          }}
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
