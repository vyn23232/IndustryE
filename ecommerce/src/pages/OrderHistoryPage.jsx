import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/OrderHistoryPage.css'

const OrderHistoryPage = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false)
  
  useEffect(() => {
    fetchUserOrders()
  }, [])
  
  const fetchUserOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please log in to view your orders.')
        return
      }

      const response = await axios.get('http://localhost:8080/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.')
      } else {
        setError('Failed to load orders. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoadingOrderDetails(true)
      const token = localStorage.getItem('token')
      
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      setSelectedOrder(response.data)
      setShowOrderModal(true)
    } catch (error) {
      console.error('Error fetching order details:', error)
      alert('Failed to load order details. Please try again.')
    } finally {
      setLoadingOrderDetails(false)
    }
  }

  const closeOrderModal = () => {
    setShowOrderModal(false)
    setSelectedOrder(null)
  }

  const formatOrderStatus = (status) => {
    const statusClass = `order-status status-${status.toLowerCase()}`
    return <span className={statusClass}>{status}</span>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewDetails = (order) => {
    fetchOrderDetails(order.id)
  }

  const handleReorder = (order) => {
    // TODO: Implement reorder functionality
    alert('Reorder functionality will be implemented soon!')
  }

  if (loading) {
    return (
      <div className="order-history">
        <div className="container">
          <div className="order-history-header">
            <h1>My Orders</h1>
            <p className="order-history-subtitle">Track and manage your purchases</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="order-history">
        <div className="container">
          <div className="order-history-header">
            <h1>My Orders</h1>
            <p className="order-history-subtitle">Track and manage your purchases</p>
          </div>
          <div className="error-container">
            <p className="error-text">{error}</p>
            <button className="retry-btn" onClick={fetchUserOrders}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="order-history">
      <div className="container">
        <div className="order-history-header">
          <h1>My Orders</h1>
          <p className="order-history-subtitle">
            Track and manage your purchases • {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h2 className="empty-title">No Orders Yet</h2>
            <p className="empty-subtitle">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <Link to="/shoes" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order, index) => (
              <div key={order.id} className="order-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="order-header">
                  <h3 className="order-number">Order #{order.orderNumber || order.id}</h3>
                  {formatOrderStatus(order.status || 'COMPLETED')}
                </div>

                <div className="order-details">
                  <div className="order-detail-item">
                    <span className="detail-label">Total Amount</span>
                    <span className="detail-value total-amount">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  
                  <div className="order-detail-item">
                    <span className="detail-label">Order Date</span>
                    <span className="detail-value order-date">
                      {formatDate(order.orderDate || order.createdAt)}
                    </span>
                  </div>

                  <div className="order-detail-item">
                    <span className="detail-label">Items</span>
                    <span className="detail-value">
                      {order.items?.length || order.orderItems?.length || 1} item{(order.items?.length || order.orderItems?.length || 1) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {order.shippingAddress && (
                    <div className="order-detail-item">
                      <span className="detail-label">Delivery Address</span>
                      <span className="detail-value">
                        {order.shippingAddress}
                      </span>
                    </div>
                  )}
                </div>

                {(order.items || order.orderItems) && (
                  <div className="order-items">
                    <div className="items-header">Order Items</div>
                    <div className="order-items-list">
                      {(order.items || order.orderItems).slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="order-item">
                          <div className="item-info">
                            <div className="item-name">
                              {item.productName || item.product?.name || 'Product'}
                            </div>
                            <div className="item-details">
                              Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                            </div>
                          </div>
                          <div className="item-price">
                            {formatCurrency(item.price || item.product?.price || 0)}
                          </div>
                        </div>
                      ))}
                      {(order.items || order.orderItems).length > 3 && (
                        <div className="order-item">
                          <div className="item-info">
                            <div className="item-name">
                              +{(order.items || order.orderItems).length - 3} more item{(order.items || order.orderItems).length - 3 !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="order-actions">
                  <button 
                    className="action-btn view-details-btn"
                    onClick={() => handleViewDetails(order)}
                    disabled={loadingOrderDetails}
                  >
                    {loadingOrderDetails ? 'Loading...' : 'View Details'}
                  </button>
                  {(order.status === 'COMPLETED' || order.status === 'DELIVERED') && (
                    <button 
                      className="action-btn reorder-btn"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeOrderModal}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeOrderModal}>×</button>
            <div className="order-modal-content">
              <div className="order-modal-header">
                <h2>Order Details</h2>
                <div className="order-modal-info">
                  <p><strong>Order Number:</strong> #{selectedOrder.orderNumber}</p>
                  <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                  <p><strong>Status:</strong> {formatOrderStatus(selectedOrder.status)}</p>
                </div>
              </div>

              <div className="order-modal-body">
                {/* Shipping Information */}
                <div className="modal-section">
                  <h3>Shipping Information</h3>
                  {selectedOrder.shippingInfo ? (
                    <div className="shipping-details">
                      <p><strong>Name:</strong> {selectedOrder.shippingInfo.firstName} {selectedOrder.shippingInfo.lastName}</p>
                      <p><strong>Address:</strong> {selectedOrder.shippingInfo.address}</p>
                      <p><strong>City:</strong> {selectedOrder.shippingInfo.city}</p>
                      <p><strong>Province:</strong> {selectedOrder.shippingInfo.province}</p>
                      <p><strong>Postal Code:</strong> {selectedOrder.shippingInfo.postalCode}</p>
                      <p><strong>Phone:</strong> {selectedOrder.shippingInfo.phone}</p>
                    </div>
                  ) : (
                    <p>No shipping information available</p>
                  )}
                </div>

                {/* Order Items */}
                <div className="modal-section">
                  <h3>Order Items</h3>
                  {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
                    <div className="modal-order-items">
                      {selectedOrder.orderItems.map((item, index) => (
                        <div key={index} className="modal-order-item">
                          <div className="item-details">
                            <h4>{item.productName}</h4>
                            <p>Quantity: {item.quantity}</p>
                            {item.size && <p>Size: {item.size}</p>}
                          </div>
                          <div className="item-pricing">
                            <p>Unit Price: {formatCurrency(item.unitPrice)}</p>
                            <p><strong>Total: {formatCurrency(item.totalPrice)}</strong></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No order items available</p>
                  )}
                </div>

                {/* Payment Information */}
                <div className="modal-section">
                  <h3>Payment Information</h3>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'Cash on Delivery'}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus || 'Pending'}</p>
                  <div className="order-total">
                    <h3><strong>Total Amount: {formatCurrency(selectedOrder.totalAmount)}</strong></h3>
                  </div>
                </div>
              </div>

              <div className="order-modal-footer">
                <button className="btn-secondary" onClick={closeOrderModal}>
                  Close
                </button>
                {(selectedOrder.status === 'COMPLETED' || selectedOrder.status === 'DELIVERED') && (
                  <button 
                    className="btn-primary"
                    onClick={() => handleReorder(selectedOrder)}
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderHistoryPage