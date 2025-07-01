import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Box,
  Avatar,
  Card,
  Tooltip,
} from "@mui/material"
import { Edit, Delete, Inventory } from "@mui/icons-material"

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
    <Card className="inventory-table-card">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Sizes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const totalStock = product.stock || getTotalStock(product.sizeInventory)
              const stockStatus = getStockStatus(totalStock)
              const availableSizes = getAvailableSizes(product.sizeInventory)
              const sizeSummary = getSizeInventorySummary(product.sizeInventory)
              
              return (
                <TableRow key={product.id} className="product-row">
                  <TableCell>
                    <Box className="product-info">
                      <Avatar src={product.image} variant="rounded" className="product-image" />
                      <Box>
                        <Typography variant="body2" fontWeight="600">
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {product.color} • {availableSizes.length > 0 ? `Available: ${availableSizes.join(', ')}` : 'No sizes available'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="sku-text">
                      {product.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600">
                      ₱{product.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600">
                      {totalStock}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {sizeSummary}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={stockStatus.label} color={stockStatus.color} size="small" />
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Manage Size Inventory">
                      <IconButton 
                        onClick={() => onManageInventory && onManageInventory(product)} 
                        size="small" 
                        className="action-button"
                      >
                        <Inventory />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton onClick={() => onEdit(product)} size="small" className="action-button">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton onClick={() => onDelete(product.id)} size="small" className="action-button delete">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="textSecondary" style={{ padding: '40px 0' }}>
                    No products found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
