import { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ShoesPage from './pages/ShoesPage'
import Toast from './components/Toast'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

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
    setCurrentPage('home')
    setToast({
      message: `Welcome back, ${userData.name}!`,
      type: 'success'
    })
  }

  const handleSignUp = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setCurrentPage('home')
    setToast({
      message: `Welcome to MultiStore, ${userData.name}!`,
      type: 'success'
    })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCart([])
    setCurrentPage('landing')
    setToast({
      message: 'Successfully logged out!',
      type: 'success'
    })
  }
  
  const closeToast = () => {
    setToast(null)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />
      case 'login':
        return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} setCurrentPage={setCurrentPage} />
      case 'home':
        return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case 'shoes':
        return <ShoesPage addToCart={addToCart} />
      case 'about':
        return <AboutPage />
      default:
        return isAuthenticated ? 
          <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} /> : 
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
