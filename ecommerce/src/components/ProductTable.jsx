import {
  Card,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
  Grid,
} from "@mui/material"
import { Edit, Delete, Inventory } from "@mui/icons-material"
import { useState } from "react"

export default function ProductTable({ products, onEdit, onDelete, onManageInventory }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", color: "error" }
    if (stock < 5) return { label: "Critical", color: "error" }
    if (stock < 10) return { label: "Low Stock", color: "warning" }
    return { label: "In Stock", color: "success" }
  }

  const getTotalStock = (sizeInventory) => {
    if (!sizeInventory || !Array.isArray(sizeInventory)) return 0
    return sizeInventory.reduce((total, size) => total + (size.totalQuantity || size.quantity || 0), 0)
  }

  const getAvailableSizes = (sizeInventory) => {
    if (!sizeInventory || !Array.isArray(sizeInventory)) return []
    return sizeInventory.filter(size => (size.availableQuantity || size.quantity || 0) > 0).map(size => size.size)
  }

  const getSizeInventorySummary = (sizeInventory) => {
    if (!sizeInventory || !Array.isArray(sizeInventory)) return "No sizes"
    
    const availableSizes = sizeInventory.filter(size => (size.availableQuantity || size.quantity || 0) > 0)
    const outOfStockSizes = sizeInventory.filter(size => (size.availableQuantity || size.quantity || 0) === 0)
    
    if (availableSizes.length === 0) return "All sizes out of stock"
    if (outOfStockSizes.length === 0) return `${sizeInventory.length} sizes available`
    
    return `${availableSizes.length}/${sizeInventory.length} sizes available`
  }

  return (
    <>
      <Grid container spacing={3}>
        {products.map((product) => {
          const totalStock = product.stock || getTotalStock(product.sizeInventory)
          const stockStatus = getStockStatus(totalStock)
          const availableSizes = getAvailableSizes(product.sizeInventory)
          const sizeSummary = getSizeInventorySummary(product.sizeInventory)

          return (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minHeight: 420,
                  position: "relative",
                  alignItems: "center",
                }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    borderRadius: 2,
                    mb: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: "1.5rem", mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Color:</strong> {product.color}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Brand:</strong> {product.brand}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>SKU:</strong> <span style={{ fontFamily: "monospace" }}>{product.sku}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Price:</strong> ₱{product.price}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Stock:</strong> {totalStock}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Sizes:</strong> {availableSizes.length > 0 ? availableSizes.join(", ") : "No sizes available"}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Status:</strong>{" "}
                    <Chip label={stockStatus.label} color={stockStatus.color} size="medium" sx={{ fontSize: "1.05rem" }} />
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    <strong>Category:</strong> {product.category}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Tooltip title="Manage Size Inventory">
                      <IconButton
                        onClick={() => onManageInventory && onManageInventory(product)}
                        size="large"
                        className="action-button"
                      >
                        <Inventory fontSize="large" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton onClick={() => onEdit(product)} size="large" className="action-button">
                        <Edit fontSize="large" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton onClick={() => onDelete(product.id)} size="large" className="action-button delete">
                        <Delete fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            </Grid>
          )
        })}
        {products.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 5, textAlign: "center" }}>
              <Typography variant="h6" color="textSecondary">
                No products found
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  )
}
