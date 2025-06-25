import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/OrderHistoryPage.css'

const OrderHistoryPage = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
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
                  <button className="action-btn view-details-btn">
                    View Details
                  </button>
                  {(order.status === 'COMPLETED' || order.status === 'DELIVERED') && (
                    <button className="action-btn reorder-btn">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistoryPage