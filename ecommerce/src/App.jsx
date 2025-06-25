import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './css/App.css'
import Navbar from './components/Navbar'
import Shoes from './pages/Shoes'
import Toast from './components/Toast'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import SearchPage from './pages/SearchPage'
import DetailsShoesPage from './pages/DetailsShoesPage'

// API base URL
const API_BASE_URL = 'http://localhost:8080/api'

// Axios interceptor to add auth token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Router-enabled App Component
function AppContent() {
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  
  const navigate = useNavigate()
  const location = useLocation()

  // Initialize authentication state and cart from localStorage/backend
  useEffect(() => {
    // Check regular user authentication
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      try {
        // Validate token by making a test request
        axios.get(`${API_BASE_URL}/cart`)
          .then(() => {
            const userData = JSON.parse(storedUser)
            setUser(userData)
            setIsAuthenticated(true)
            // Load cart from backend
            loadCartFromBackend()
          })
          .catch(error => {
            console.error('Token validation failed:', error)
            // Clear invalid credentials
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('cart')
            setCart([])
          })
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        setCart([])
      }
    } else {
      // Clear any existing cart data for non-authenticated users
      setCart([])
      localStorage.removeItem('cart')
    }
  }, [])

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Load cart from backend (for authenticated users)
  const loadCartFromBackend = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`)
      if (response.data && response.data.items) {
        const cartItems = response.data.items.map(item => ({
          id: item.productId, // Use productId as the main id for frontend
          name: item.productName,
          price: item.unitPrice,
          quantity: item.quantity,
          image: item.productImage || 'https://via.placeholder.com/200',
          color: 'Default', // You might want to add color to backend
          cartItemId: item.id // Keep the cart item ID for backend operations
        }))
        setCart(cartItems)
        return cartItems
      }
      return []
    } catch (error) {
      console.error('Error loading cart from backend:', error)
      return []
    }
  }

  const addToCart = async (product, quantity = 1) => {
    // If not authenticated, prevent adding to cart and show login prompt
    if (!isAuthenticated) {
      setToast({
        message: 'Please log in to add items to your cart',
        type: 'error'
      })
      navigate('/login')
      return
    }

    const existingItem = cart.find(item => item.id === product.id)
    let updatedCart

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity }]
    }
    
    setCart(updatedCart)
    
    // Sync with backend for authenticated users
    try {
      await axios.post(`${API_BASE_URL}/cart/add`, {
        productId: product.id,
        quantity: quantity
      })
      
      // Show success toast
      setToast({
        message: `${quantity} ${product.name} added to cart!`,
        type: 'success'
      })
    } catch (error) {
      console.error('Error syncing cart with backend:', error)
      // Revert cart state if backend sync fails
      setCart(cart)
      setToast({
        message: 'Failed to add item to cart. Please try again.',
        type: 'error'
      })
    }
  }

  const handleLogin = async (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Load user's cart from backend
    await loadCartFromBackend()
    
    setToast({
      message: `Welcome back, ${userData.name}!`,
      type: 'success'
    })
    
    navigate('/shoes')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCart([]) // Clear cart on logout
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    navigate('/')
    setToast({
      message: 'Successfully logged out!',
      type: 'success'
    })
  }

  const closeToast = () => {
    setToast(null)
  }
  const updateQuantity = async (id, newQuantity) => {
    if (!isAuthenticated) {
      setToast({
        message: 'Please log in to modify your cart',
        type: 'error'
      })
      return
    }

    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    
    // Sync with backend
    try {
      const cartItem = cart.find(item => item.id === id)
      if (cartItem) {
        const itemId = cartItem.cartItemId || cartItem.id
        await axios.put(`${API_BASE_URL}/cart/items/${itemId}`, {
          quantity: newQuantity
        })
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      // Revert cart state if backend sync fails
      setCart(cart)
      setToast({
        message: 'Failed to update cart. Please try again.',
        type: 'error'
      })
    }
  }

  const removeFromCart = async (id) => {
    if (!isAuthenticated) {
      setToast({
        message: 'Please log in to modify your cart',
        type: 'error'
      })
      return
    }

    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    
    // Sync with backend
    try {
      const cartItem = cart.find(item => item.id === id)
      if (cartItem) {
        const itemId = cartItem.cartItemId || cartItem.id
        await axios.delete(`${API_BASE_URL}/cart/items/${itemId}`)
      }
      
      setToast({
        message: 'Item removed from cart',
        type: 'success'
      })
    } catch (error) {
      console.error('Error removing cart item:', error)
      // Revert cart state if backend sync fails
      setCart(cart)
      setToast({
        message: 'Failed to remove item. Please try again.',
        type: 'error'
      })
    }
  }

  const handleOrderComplete = (order) => {
    setOrderDetails(order)
    // Clear cart after successful order
    setCart([])
    
    // Clear cart on backend if authenticated
    if (isAuthenticated) {
      try {
        axios.delete(`${API_BASE_URL}/cart/clear`)
      } catch (error) {
        console.error('Error clearing cart on backend:', error)
      }
    }
  }

  return (
    <div className="app">
      <Navbar 
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/shoes" /> : <LandingPage />
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/shoes" /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/shoes" /> : <SignUpPage setToast={setToast} />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shoes" element={<Shoes addToCart={addToCart} isAuthenticated={isAuthenticated} />} />
          <Route path="/shoes/:id" element={<DetailsShoesPage addToCart={addToCart} isAuthenticated={isAuthenticated} />} />
          <Route path="/search" element={<SearchPage addToCart={addToCart} isAuthenticated={isAuthenticated} />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            isAuthenticated ? <ProfilePage user={user} setUser={setUser} setToast={setToast} onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/cart" element={
            <CartPage 
              cart={cart} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart}
              isAuthenticated={isAuthenticated}
              user={user}
            />
          } />
          <Route path="/checkout" element={
            <CheckoutPage 
              cart={cart} 
              user={user} 
              onOrderComplete={handleOrderComplete}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/orders" element={
            isAuthenticated ? <OrderHistoryPage user={user} /> : <Navigate to="/login" />
          } />
          <Route path="/order-confirmation" element={
            <OrderConfirmationPage orderDetails={orderDetails} />
          } />
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
    </div>
  )
}

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
