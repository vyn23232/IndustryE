import { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ShoesPage from './pages/ShoesPage'
import Toast from './components/Toast'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)
  

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
  
  const closeToast = () => {
    setToast(null)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'shoes':
        return <ShoesPage addToCart={addToCart} />
      default:
        return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartItemCount={cartItemCount} />
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
