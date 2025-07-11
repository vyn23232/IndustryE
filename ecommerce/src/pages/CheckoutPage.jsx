import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../css/CheckoutPage.css'

const CheckoutPage = ({ cart, user, onOrderComplete, isAuthenticated }) => {
  const navigate = useNavigate()
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

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

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
      // Create order payload matching the backend's CreateOrderRequest structure
      const orderData = {
        totalAmount: calculateTotal(),
        paymentMethod: paymentMethod,
        shippingInfo: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          address: shippingInfo.address,
          city: shippingInfo.city,
          province: shippingInfo.province,
          postalCode: shippingInfo.postalCode,
          phone: shippingInfo.phone
        },
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image || 'https://via.placeholder.com/200',
          size: item.size,
          price: item.price,
          quantity: item.quantity
        }))
      }

      console.log('Sending order data:', orderData) // Debug log

      // Get the JWT token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found. Please log in again.')
      }

      // Submit order to backend with authentication
      const response = await axios.post('http://localhost:8080/api/orders/create', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data) {
        // Order successfully created
        onOrderComplete({
          orderNumber: response.data.orderNumber || 'ORD-' + Date.now(),
          totalAmount: calculateTotal(),
          status: 'PENDING',
          orderId: response.data.id
        })
        navigate('/order-confirmation')
      }
    } catch (error) {
      console.error('Order failed:', error)
      console.error('Error details:', error.response?.data)
      alert(`Failed to place order: ${error.response?.data?.message || error.message}`)
    } finally {
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
                    <div key={`${item.id}-${item.size || 'no-size'}`} className="order-item" style={{ alignItems: 'center', gap: 18 }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 12,
                          background: '#fff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          marginRight: 22,
                          border: '1px solid #eee'
                        }}
                      />
                      <div className="item-details" style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{item.name}</h4>
                        <p style={{ margin: '2px 0', color: '#888', fontSize: 14 }}>Size: {item.size || 'N/A'}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            className="quantity-btn"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: '1px solid #eee',
                              background: '#fafafa',
                              color: '#ff6b35',
                              fontWeight: 700,
                              fontSize: 18,
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              if (item.quantity > 1) {
                                // Call a prop or context function to update quantity
                                if (typeof item.onUpdateQuantity === 'function') {
                                  item.onUpdateQuantity(item.id, item.quantity - 1, item.size)
                                }
                              }
                            }}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >-</button>
                          <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: '1px solid #eee',
                              background: '#fafafa',
                              color: '#ff6b35',
                              fontWeight: 700,
                              fontSize: 18,
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              // Call a prop or context function to update quantity
                              if (typeof item.onUpdateQuantity === 'function') {
                                item.onUpdateQuantity(item.id, item.quantity + 1, item.size)
                              }
                            }}
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                        <p style={{ margin: '2px 0', color: '#ff6b35', fontWeight: 600, fontSize: 15 }}>₱{item.price}</p>
                      </div>
                      <div className="item-total" style={{ fontWeight: 700, color: '#ff6b35', fontSize: 16 }}>
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </div>
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
              <div key={`${item.id}-${item.size || 'no-size'}`} className="sidebar-item" style={{ alignItems: 'center', gap: 10 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 64,            
                    height: 64,           
                    objectFit: 'cover',
                    borderRadius: 10,
                    background: '#fff',
                    border: '1px solid #eee',
                    marginRight: 14      
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                  <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Qty: {item.quantity}</p>
                  {item.size && <p style={{ margin: 0, color: '#888', fontSize: 13 }}>Size: {item.size}</p>}
                </div>
                <span style={{ fontWeight: 600, color: '#ff6b35', marginLeft: 'auto' }}>
                  ₱{(item.price * item.quantity).toFixed(2)}
                </span>
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