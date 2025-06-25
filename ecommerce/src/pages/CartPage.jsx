import React from "react"
import '../css/CartPage.css'

const CartPage = ({ cart, updateQuantity, removeFromCart, setCurrentPage }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleContinueShopping = () => {
    setCurrentPage('shoes');
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
          <button className="checkout-btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage