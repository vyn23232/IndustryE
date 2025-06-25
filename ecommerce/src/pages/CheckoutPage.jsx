import React, { useState } from 'react'
import '../css/CheckoutPage.css'

const CheckoutPage = ({ cart, user, setCurrentPage, onOrderComplete }) => {
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Review
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isLoading, setIsLoading] = useState(false)

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', description: 'Pay when your order arrives' },
    { id: 'gcash', name: 'GCash', description: 'Pay via GCash (Coming Soon)', disabled: true },
    { id: 'paypal', name: 'PayPal', description: 'Pay via PayPal (Coming Soon)', disabled: true }
  ]

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    try {
      // Simulate order processing
      setTimeout(() => {
        onOrderComplete({
          orderNumber: 'ORD-' + Date.now(),
          totalAmount: calculateTotal(),
          status: 'PENDING'
        })
        setCurrentPage('order-confirmation')
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Order failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-steps">
          {/* Step indicator */}
          <div className="steps-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <label>Shipping</label>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <label>Payment</label>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <label>Review</label>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="checkout-step">
              <h2>Shipping Information</h2>
              <form className="shipping-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  required
                />
                <div className="form-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                  />
                  <input
                    type="text"
                    name="province"
                    placeholder="Province"
                    value={shippingInfo.province}
                    onChange={handleShippingChange}
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <button type="button" className="btn-primary" onClick={handleNextStep}>
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="checkout-step">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div key={method.id} className={`payment-option ${method.disabled ? 'disabled' : ''}`}>
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      disabled={method.disabled}
                    />
                    <label htmlFor={method.id}>
                      <strong>{method.name}</strong>
                      <span>{method.description}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="step-actions">
                <button className="btn-secondary" onClick={handlePrevStep}>
                  Back to Shipping
                </button>
                <button className="btn-primary" onClick={handleNextStep}>
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <div className="checkout-step">
              <h2>Order Review</h2>
              <div className="order-summary">
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p>₱{item.price}</p>
                      </div>
                      <div className="item-total">₱{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>₱{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>₱{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="step-actions">
                <button className="btn-secondary" onClick={handlePrevStep}>
                  Back to Payment
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-sidebar">
          <h3>Order Summary</h3>
          <div className="sidebar-items">
            {cart.map(item => (
              <div key={item.id} className="sidebar-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="sidebar-total">
            <strong>Total: ₱{calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage