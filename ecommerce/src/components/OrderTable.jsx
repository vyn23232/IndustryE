import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Avatar,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Chip
} from "@mui/material"
import { Visibility } from "@mui/icons-material"

export default function OrderTable({ 
  orders, 
  onStatusChange, 
  onViewDetails, 
  paymentStatusOptions, 
  deliveryStatusOptions 
}) {
  const getStatusColor = (status, type) => {
    if (type === 'payment') {
      switch (status) {
        case 'paid': return 'success'
        case 'pending': return 'warning'
        case 'failed': return 'error'
        default: return 'default'
      }
    } else {
      switch (status) {
        case 'delivered': return 'success'
        case 'shipped': return 'info'
        case 'processing': return 'warning'
        case 'cancelled': return 'error'
        default: return 'default'
      }
    }
  }

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString()}`
  }

  return (
    <TableContainer component={Paper} className="orders-table-card">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Details</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Delivery Status</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="order-row">
              <TableCell>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    #{order.orderNumber || order.id}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    ID: {order.id}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell>
                <Box className="customer-info">
                  <Avatar className="customer-avatar">
                    {order.customerName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {order.customerName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {order.email}
                    </Typography>
                    {order.phone && (
                      <Typography variant="caption" color="textSecondary" display="block">
                        {order.phone}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Box>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.slice(0, 2).map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        {item.productName} ({item.size}) x{item.quantity}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No items
                    </Typography>
                  )}
                  {order.orderItems && order.orderItems.length > 2 && (
                    <Typography variant="caption" color="textSecondary">
                      +{order.orderItems.length - 2} more items
                    </Typography>
                  )}
                </Box>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {formatCurrency(order.total)}
                </Typography>
              </TableCell>

              <TableCell>
                <FormControl size="small" className="status-select">
                  <Select
                    value={order.paymentStatus}
                    onChange={(e) => onStatusChange(order.id, 'paymentStatus', e.target.value)}
                    renderValue={(value) => (
                      <Chip 
                        label={value.toUpperCase()} 
                        color={getStatusColor(value, 'payment')} 
                        size="small"
                        className={`status-chip ${value}`}
                      />
                    )}
                  >
                    {paymentStatusOptions.map((status) => (
                      <MenuItem key={status} value={status.toLowerCase()}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <FormControl size="small" className="status-select">
                  <Select
                    value={order.deliveryStatus}
                    onChange={(e) => onStatusChange(order.id, 'deliveryStatus', e.target.value)}
                    renderValue={(value) => (
                      <Chip 
                        label={value.toUpperCase()} 
                        color={getStatusColor(value, 'delivery')} 
                        size="small"
                        className={`status-chip ${value}`}
                      />
                    )}
                  >
                    {deliveryStatusOptions.map((status) => (
                      <MenuItem key={status} value={status.toLowerCase()}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <Typography variant="body2">
                  {order.orderDate}
                </Typography>
              </TableCell>

              <TableCell>
                <IconButton 
                  className="action-button" 
                  onClick={() => onViewDetails(order)}
                  size="small"
                >
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {orders.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="body1" color="textSecondary">
            No orders found
          </Typography>
        </Box>
      )}
    </TableContainer>
  )
}
