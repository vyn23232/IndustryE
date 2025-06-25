import { useState, useEffect } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AllShoes from './pages/AllShoes'
import Toast from './components/Toast'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)

  // Initialize authentication state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
        setCurrentPage('shoes') // Direct authenticated users to shoes page
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity }])
    }
    
    // Show toast
    setToast({
      message: `${quantity} ${product.name} added to cart!`,
      type: 'success'
    })
  }

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setCurrentPage('shoes')  // Direct to shoes page instead of home
    localStorage.setItem('user', JSON.stringify(userData))
    setToast({
      message: `Welcome back, ${userData.name}!`,
      type: 'success'
    })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCart([])
    setCurrentPage('landing')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setToast({
      message: 'Successfully logged out!',
      type: 'success'
    })
  }
  
  const closeToast = () => {
    setToast(null)
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
  }

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    setToast({
      message: 'Item removed from cart',
      type: 'success'
    })
  }

  const handleOrderComplete = (order) => {
    setOrderDetails(order)
    // Clear cart after successful order
    setCart([])
  }

  const renderCurrentPage = () => {
    // Handle shoe category pages that aren't implemented yet
    if (['running', 'sports', 'casual', 'limited'].includes(currentPage)) {
      // For now, redirect to the AllShoes page with a filter applied
      setToast({
        message: `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} shoes coming soon! Showing all shoes instead.`,
        type: 'info'
      })
      return <AllShoes addToCart={addToCart} categoryFilter={currentPage} />
    }

    switch(currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />
      
      case 'login':
        return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
      
      case 'signup':
        return <SignUpPage setCurrentPage={setCurrentPage} setToast={setToast} />
      
      case 'home':
        // Redirect home to shoes page since we're only selling shoes
        setCurrentPage('shoes')
        return <AllShoes addToCart={addToCart} />
      
      case 'shoes':
        return <AllShoes addToCart={addToCart} />
      
      case 'about':
        return <AboutPage />
      
      case 'profile':
        if (!isAuthenticated) {
          setCurrentPage('login')
          setToast({
            message: 'Please log in to view your profile',
            type: 'info'
          })
          return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
        }
        return <ProfilePage user={user} />
      
      case 'cart':
        if (!isAuthenticated) {
          setCurrentPage('login')
          setToast({
            message: 'Please log in to view your cart',
            type: 'info'
          })
          return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
        }
        return <CartPage 
          cart={cart} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
          setCurrentPage={setCurrentPage} 
        />
      
      case 'checkout':
        if (!isAuthenticated) {
          setCurrentPage('login')
          setToast({
            message: 'Please log in to proceed with checkout',
            type: 'info'
          })
          return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
        }
        return <CheckoutPage 
          cart={cart} 
          user={user} 
          setCurrentPage={setCurrentPage}
          onOrderComplete={handleOrderComplete}
        />
      
      case 'order-confirmation':
        return <OrderConfirmationPage 
          orderDetails={orderDetails} 
          setCurrentPage={setCurrentPage} 
        />
      
      default:
        // Default case: show landing page for non-authenticated users, shoes for authenticated
        return isAuthenticated ? 
          <AllShoes addToCart={addToCart} /> : 
          <LandingPage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderCurrentPage()}
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

export default App
