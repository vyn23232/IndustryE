import React from 'react'
import '../css/OrderConfirmationPage.css'

const OrderConfirmationPage = ({ orderDetails, setCurrentPage }) => {
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        <p className="confirmation-message">
          Thank you for your order! We've received your order and will process it shortly.
        </p>
        
        <div className="order-details">
          <h2>Order Details</h2>
          <div className="detail-row">
            <span>Order Number:</span>
            <strong>#{orderDetails?.orderNumber}</strong>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <strong>₱{orderDetails?.totalAmount?.toFixed(2)}</strong>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <span className="status pending">Pending</span>
          </div>
          <div className="detail-row">
            <span>Estimated Delivery:</span>
            <span>3-5 business days</span>
          </div>
        </div>
        
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll notify you when your order is shipped</li>
            <li>Track your order in the "My Orders" section</li>
          </ul>
        </div>
        
        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => setCurrentPage('shoes')}
          >
            Continue Shopping
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setCurrentPage('orders')}
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage