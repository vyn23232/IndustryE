import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mapProductWithImages } from '../utils/imageMapper'
import axios from 'axios'
import '../css/DetailsShoesPage.css'

const DetailsShoesPage = ({ addToCart, isAuthenticated }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shoe, setShoe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [sizeInventory, setSizeInventory] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('') // 'error', 'warning', 'success'

  // Available sizes for shoes
  const availableSizes = [
    '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'
  ]

  useEffect(() => {
    fetchShoeDetails()
  }, [id])

  const fetchShoeDetails = async () => {
    try {
      setLoading(true)
      // Fetch product from backend API
      const response = await axios.get(`http://localhost:8080/api/products/${id}`)
      
      if (!response.data) {
        setError('Shoe not found.')
        return
      }
      
      // Map backend data with local images
      const shoeData = mapProductWithImages(response.data)
      
      // Parse sizes from JSON string if needed
      if (typeof shoeData.availableSizes === 'string') {
        shoeData.sizes = JSON.parse(shoeData.availableSizes)
      } else {
        shoeData.sizes = shoeData.availableSizes || availableSizes
      }
      
      // Add additional features
      shoeData.features = [
        'Premium materials',
        'Comfortable fit', 
        'Durable construction',
        'Versatile style'
      ]
      
      setShoe(shoeData)
      setSizeInventory(shoeData.sizeInventory || [])
    } catch (error) {
      console.error('Error loading shoe details:', error)
      setError('Failed to load shoe details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setAlertMessage('Please select a size before adding to cart.')
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage('')
        setAlertType('')
      }, 3000)
      return
    }

    // Check size availability
    const sizeInfo = sizeInventory.find(inv => inv.size === selectedSize)
    if (sizeInfo && sizeInfo.availableQuantity < quantity) {
      setAlertMessage(`Only ${sizeInfo.availableQuantity} items available in size ${selectedSize}. ${sizeInfo.availableQuantity === 0 ? 'Out of stock!' : 'Please reduce quantity.'}`)
      setAlertType('error')
      setTimeout(() => {
        setAlertMessage('')
        setAlertType('')
      }, 3000)
      return
    }

    const shoeWithDetails = {
      ...shoe,
      selectedSize,
      image: shoe.images[0] // Use main image for cart
    }

    try {
      await addToCart(shoeWithDetails, quantity)
      
      // Show success message
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // Helper function to get size availability info
  const getSizeAvailability = (size) => {
    const sizeInfo = sizeInventory.find(inv => inv.size === size)
    return sizeInfo ? sizeInfo.availableQuantity : 0
  }

  // Helper function to check if size is available
  const isSizeAvailable = (size) => {
    return getSizeAvailability(size) > 0
  }

  if (loading) {
    return (
      <div className="details-page loading">
        <div className="container">
          <div className="loading-spinner">
            <p>Loading shoe details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !shoe) {
    return (
      <div className="details-page error">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error || 'Shoe not found'}</p>
            <button onClick={() => navigate('/shoes')} className="back-btn">
              Back to Shoes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate('/shoes')} className="breadcrumb-link">
            Shoes
          </button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{shoe.name}</span>
        </div>

        <div className="product-details">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img 
                src={shoe.images[selectedImageIndex]} 
                alt={shoe.name}
              />
            </div>
            <div className="thumbnail-images">
              {shoe.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${shoe.name} view ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{shoe.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(shoe.rating) ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">({shoe.rating})</span>
              </div>
              <div className="product-price">
                <span className="price">₱{shoe.price}</span>
              </div>
            </div>

            <div className="product-description">
              <p>{shoe.description}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                {shoe.sizes.map((size) => {
                  const available = getSizeAvailability(size)
                  const isAvailable = available > 0
                  return (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''} ${!isAvailable ? 'out-of-stock' : ''}`}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      title={!isAvailable ? 'Out of stock' : `${available} available`}
                    >
                      {size}
                      {!isAvailable && <span className="out-of-stock-indicator">×</span>}
                    </button>
                  )
                })}
              </div>
              {!selectedSize && (
                <p className="size-hint">Please select a size</p>
              )}
              {selectedSize && (
                <p className="size-availability">
                  Size {selectedSize}: {getSizeAvailability(selectedSize)} available
                </p>
              )}
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="purchase-actions">
              {/* Alert Messages */}
              {alertMessage && (
                <div className={`alert-message ${alertType}`}>
                  {alertType === 'error' && '⚠ '}
                  {alertType === 'warning' && '⚠ '}
                  {alertType === 'success' && '✓ '}
                  {alertMessage}
                </div>
              )}
              {showSuccessMessage && (
                <div className="success-message">
                  ✓ Added to cart successfully!
                </div>
              )}
              {isAuthenticated && (
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !isSizeAvailable(selectedSize)}
                >
                  Add to Cart - ₱{(shoe.price * quantity).toFixed(2)}
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

            {/* Product Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {shoe.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <strong>Category:</strong> {shoe.category}
              </div>
              <div className="info-item">
                <strong>Product ID:</strong> {shoe.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsShoesPage
