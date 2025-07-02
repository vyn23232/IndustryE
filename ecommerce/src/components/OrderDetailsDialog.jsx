"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar
} from "@mui/material"

export default function OrderDetailsDialog({ open, onClose, order }) {
  if (!order) return null

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `₱${amount.toLocaleString()}`
    }
    if (amount && typeof amount === 'object' && amount.toString) {
      return `₱${parseFloat(amount.toString()).toLocaleString()}`
    }
    return `₱${amount || 0}`
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    
    try {
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return date.toString()
    }
  }

  const getStatusColor = (status, type) => {
    const statusLower = status?.toLowerCase()
    if (type === 'payment') {
      switch (statusLower) {
        case 'paid': return 'success'
        case 'pending': return 'warning'
        case 'failed': return 'error'
        default: return 'default'
      }
    } else {
      switch (statusLower) {
        case 'delivered': 
        case 'completed': return 'success'
        case 'shipped': return 'info'
        case 'processing': return 'warning'
        case 'cancelled': return 'error'
        default: return 'default'
      }
    }
  }

  const getCustomerName = () => {
    if (order.shippingInfo) {
      const firstName = order.shippingInfo.firstName || ''
      const lastName = order.shippingInfo.lastName || ''
      return `${firstName} ${lastName}`.trim() || 'N/A'
    }
    return order.customerName || 'N/A'
  }

  const getShippingAddress = () => {
    // Only return address fields, not email
    if (order.shippingInfo) {
      // Remove email if present in shippingInfo
      const { address, city, province, postalCode } = order.shippingInfo
      const parts = [address, city, province, postalCode].filter(Boolean)
      return parts.length > 0 ? parts.join(', ') : 'N/A'
    }
    return order.shippingAddress || 'N/A'
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="dialog-title">
        Order Details - #{order.orderNumber || order.id}
      </DialogTitle>
      
      <DialogContent className="dialog-content">
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <Card className="detail-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Name:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {getCustomerName()}
                  </Typography>
                </Box>
                {(order.phone || order.shippingInfo?.phone) && (
                  <Box className="detail-row">
                    <Typography variant="body2" color="textSecondary">
                      Phone:
                    </Typography>
                    <Typography variant="body2">
                      {order.phone || order.shippingInfo?.phone}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Order Information */}
          <Grid item xs={12} md={6}>
            <Card className="detail-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Information
                </Typography>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Order Date:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatDate(order.orderDate)}
                  </Typography>
                </Box>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Payment Status:
                  </Typography>
                  <Chip 
                    label={order.paymentStatus?.toUpperCase() || 'PENDING'} 
                    color={getStatusColor(order.paymentStatus, 'payment')} 
                    size="small"
                  />
                </Box>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Delivery Status:
                  </Typography>
                  <Chip 
                    label={order.status?.toUpperCase() || order.deliveryStatus?.toUpperCase() || 'PENDING'} 
                    color={getStatusColor(order.status || order.deliveryStatus, 'delivery')} 
                    size="small"
                  />
                </Box>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Payment Method:
                  </Typography>
                  <Typography variant="body2">
                    {order.paymentMethod || 'N/A'}
                  </Typography>
                </Box>
                <Box className="detail-row">
                  <Typography variant="body2" color="textSecondary">
                    Shipping Address:
                  </Typography>
                  <Typography variant="body2">
                    {getShippingAddress()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Items */}
          <Grid item xs={12}>
            <Card className="detail-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, index) => (
                    <Box key={index}>
                      <Card className="detail-card" sx={{ mb: 3, p: 3 }}>
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: 400,
                            margin: "0 auto 24px auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3,
                            overflow: "hidden",
                            background: "#fff",
                          }}
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            style={{
                              width: "100%",
                              height: 300,
                              objectFit: "cover",
                              display: "block",
                              borderRadius: 12,
                              background: "#fff",
                            }}
                          />
                        </Box>
                        <Box className="product-info" sx={{ flex: 1, ml: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {item.productName}
                          </Typography>
                          {item.size && (
                            <Typography variant="body2" color="textSecondary">
                              Size: {item.size}
                            </Typography>
                          )}
                          <Typography variant="body2" color="textSecondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(item.unitPrice)} each
                          </Typography>
                        </Box>
                      </Card>
                      {index < order.orderItems.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))
                ) : (
                  // Fallback for single item orders (backward compatibility)
                  order.shoe || order.productName ? (
                    <Box className="product-detail">
                      <Avatar 
                        src="/placeholder.svg?height=80&width=80" 
                        variant="rounded" 
                        className="product-image"
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box className="product-info" sx={{ flex: 1, ml: 2 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {order.shoe || order.productName}
                        </Typography>
                        {order.brand && (
                          <Typography variant="body2" color="textSecondary">
                            Brand: {order.brand}
                          </Typography>
                        )}
                        {order.size && (
                          <Typography variant="body2" color="textSecondary">
                            Size: {order.size}
                          </Typography>
                        )}
                        {order.quantity && (
                          <Typography variant="body2" color="textSecondary">
                            Quantity: {order.quantity}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No items found
                    </Typography>
                  )
                )}
                
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    Total Amount:
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    {formatCurrency(order.totalAmount || order.total)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
