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


function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Load saved user data from localStorage on app startup
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id)
    
    if (existingProductIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingProductIndex].quantity += quantity
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
    setToast({
      message: 'Successfully logged out!',
      type: 'success'
    })
  }
  
  const closeToast = () => {
    setToast(null)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
    setToast({
      message: 'Item removed from cart',
      type: 'info'
    })
  }

  const renderPage = () => {
    // If user tries to access cart without logging in, redirect to login
    if (currentPage === 'cart' && !isAuthenticated) {
      setCurrentPage('login')
      setToast({
        message: 'Please log in to view your cart',
        type: 'info'
      })
      return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
    }

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
      case 'cart':
        return <CartPage 
          cart={cart} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
          setCurrentPage={setCurrentPage} 
        />
      case 'profile':
        return <ProfilePage user={user} />
      default:
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
        {renderPage()}
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
