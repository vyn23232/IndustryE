import {
  Card,
  Typography,
  Chip,
  Button,
  Box,
  Grid,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material"

export default function OrderTable({
  orders,
  onStatusChange,
  onViewDetails,
  paymentStatusOptions,
  deliveryStatusOptions,
}) {
  const getStatusColor = (status, type) => {
    if (type === "payment") {
      switch (status) {
        case "paid":
          return "success"
        case "pending":
          return "warning"
        case "failed":
          return "error"
        default:
          return "default"
      }
    } else {
      switch (status) {
        case "delivered":
          return "success"
        case "shipped":
          return "info"
        case "processing":
          return "warning"
        case "cancelled":
          return "error"
        default:
          return "default"
      }
    }
  }

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString()}`
  }

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} md={6} lg={4} key={order.id}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: 320,
              position: "relative",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.35rem", mb: 1 }}>
              Order #{order.orderNumber || order.id}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Order ID:</strong> {order.id}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Customer:</strong> {order.customerName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Email:</strong> {order.email}
            </Typography>
            {order.phone && (
              <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
                <strong>Phone:</strong> {order.phone}
              </Typography>
            )}
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Products:</strong>{" "}
              {order.orderItems && order.orderItems.length > 0
                ? order.orderItems
                    .slice(0, 2)
                    .map(
                      (item, idx) =>
                        `${item.productName} (${item.size}) x${item.quantity}${
                          idx < order.orderItems.slice(0, 2).length - 1 ? ", " : ""
                        }`
                    )
                : "No items"}
              {order.orderItems && order.orderItems.length > 2 && (
                <span>
                  {" "}
                  +{order.orderItems.length - 2} more item
                  {order.orderItems.length - 2 !== 1 ? "s" : ""}
                </span>
              )}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Total:</strong> {formatCurrency(order.total)}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={order.paymentStatus}
                  onChange={(e) => onStatusChange(order.id, "paymentStatus", e.target.value)}
                  renderValue={(value) => (
                    <Chip
                      label={value.toUpperCase()}
                      color={getStatusColor(value, "payment")}
                      size="medium"
                      sx={{ fontSize: "1rem", fontWeight: 700 }}
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
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={order.deliveryStatus}
                  onChange={(e) => onStatusChange(order.id, "deliveryStatus", e.target.value)}
                  renderValue={(value) => (
                    <Chip
                      label={value.toUpperCase()}
                      color={getStatusColor(value, "delivery")}
                      size="medium"
                      sx={{ fontSize: "1rem", fontWeight: 700 }}
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
            </Box>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong>Order Date:</strong> {order.orderDate}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  flex: 1,
                  py: 1.5,
                }}
                onClick={() => onViewDetails(order)}
              >
                View Details
              </Button>
            </Stack>
          </Card>
        </Grid>
      ))}
      {orders.length === 0 && (
        <Grid item xs={12}>
          <Card sx={{ p: 5, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              No orders found
            </Typography>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}
