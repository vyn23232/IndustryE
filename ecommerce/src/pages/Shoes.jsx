import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { mapProductsWithImages } from '../utils/imageMapper'
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ShoeCard from '../components/ShoeCard'
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

  // Modal state for slideshow
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImages, setModalImages] = useState([])
  const [modalShoeName, setModalShoeName] = useState('')
  const [modalIndex, setModalIndex] = useState(0)
  const intervalRef = useRef(null)
  const holdTimeoutRef = useRef(null)

  // Available categories
  const categories = [
    { key: 'all', label: 'All Shoes' },
    { key: 'running', label: 'Running' },
    { key: 'sports', label: 'Sports' },
    { key: 'casual', label: 'Casual' },
    { key: 'limited', label: 'Limited Edition' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
      setActiveCategory('all')
    } else if (categoryParam && categories.find(cat => cat.key === categoryParam)) {
      setActiveCategory(categoryParam)
      setSearchQuery('')
    } else {
      setActiveCategory('all')
      setSearchQuery('')
    }
  }, [searchParams])

  useEffect(() => {
    let filteredShoes = allShoes
    if (searchQuery) {
      filteredShoes = allShoes.filter(shoe =>
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else if (activeCategory !== 'all') {
      filteredShoes = allShoes.filter(shoe => shoe.category === activeCategory)
    }
    setShoes(filteredShoes)
    setCurrentIndex(0)
  }, [activeCategory, allShoes, searchQuery])

  // Slideshow effect for modal
  useEffect(() => {
    if (modalOpen && modalImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setModalIndex(prev => (prev + 1) % modalImages.length)
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [modalOpen, modalImages])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8080/api/products')
      const productsWithImages = mapProductsWithImages(response.data)
      setAllShoes(productsWithImages)
    } catch (error) {
      console.error('Error loading products from backend:', error)
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
    setSearchQuery('')
  }

  const handleViewProduct = (shoe) => {
    navigate(`/shoes/${shoe.id}`)
  }

  // Hold-to-show modal logic
  const handleImageMouseDown = (e, shoe) => {
    if (e.button === 0) { // left mouse button
      holdTimeoutRef.current = setTimeout(() => {
        setModalImages(shoe.images && shoe.images.length >= 5 ? shoe.images.slice(0, 5) : [shoe.image])
        setModalShoeName(shoe.name)
        setModalIndex(0)
        setModalOpen(true)
      }, 400) // 400ms hold
    }
  }
  const handleImageMouseUp = () => clearTimeout(holdTimeoutRef.current)
  const handleModalClose = () => {
    setModalOpen(false)
    setModalImages([])
    setModalIndex(0)
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
                    <ShoeCard
                      key={shoe.id}
                      shoe={shoe}
                      onViewProduct={handleViewProduct}
                      onImageMouseDown={handleImageMouseDown}
                      onImageMouseUp={handleImageMouseUp}
                      onImageMouseLeave={handleImageMouseUp}
                    />
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

              {/* Modal for slideshow */}
              <Dialog
                open={modalOpen}
                onClose={handleModalClose}
                maxWidth="md"
                PaperProps={{
                  style: {
                    background: 'rgba(30,30,30,0.98)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    borderRadius: 20,
                  }
                }}
              >
                <div style={{ position: 'relative', padding: 0, background: 'transparent' }}>
                  <IconButton
                    onClick={handleModalClose}
                    style={{ position: 'absolute', top: 12, right: 12, color: '#fff', zIndex: 2 }}
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 350,
                      minHeight: 350,
                      padding: 32,
                      background: 'transparent'
                    }}
                  >
                    <img
                      src={modalImages[modalIndex]}
                      alt={modalShoeName}
                      style={{
                        maxWidth: '60vw',
                        maxHeight: '60vh',
                        borderRadius: 16,
                        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
                        background: '#fff',
                        transition: 'opacity 0.5s'
                      }}
                    />
                    <div style={{ marginTop: 18, color: '#fff', fontWeight: 600, fontSize: 18 }}>
                      {modalShoeName} <span style={{ fontSize: 14, color: '#bbb' }}>({modalIndex + 1}/{modalImages.length})</span>
                    </div>
                  </div>
                </div>
              </Dialog>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shoes
