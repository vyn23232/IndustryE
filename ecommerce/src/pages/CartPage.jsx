import React from "react"
import { useNavigate } from 'react-router-dom'
import '../css/CartPage.css'

const CartPage = ({ cart, updateQuantity, removeFromCart, isAuthenticated, user }) => {
  const navigate = useNavigate()
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleContinueShopping = () => {
    navigate('/shoes')
  }

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout')
    } else {
      navigate('/login')
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h2>Please Log In to View Your Cart</h2>
            <p>You need to be logged in to access your shopping cart and make purchases.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="btn-primary" onClick={handleLogin}>
                Log In
              </button>
              <button className="btn-secondary" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Start shopping to add items to your cart!</p>
        <button className="btn-primary" onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart ({cart.length} items)</h2>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-color">{item.color}</p>
                <p className="item-price">₱ {item.price}</p>
              </div>

              <div className="item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="item-total">
                ₱ {(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₱ {calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₱ {calculateTotal().toFixed(2)}</span>
          </div>
          
          {isAuthenticated ? (
            <button className="checkout-btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          ) : (
            <div className="auth-required">
              <p className="auth-message">Please log in to complete your purchase</p>
              <button className="login-btn btn-primary" onClick={handleLogin}>
                Log In to Checkout
              </button>
              <p className="guest-info">Don't have an account? <a href="/signup">Sign up here</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage