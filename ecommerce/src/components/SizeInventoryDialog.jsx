import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Box,
  Alert,
  Chip,
  Paper,
} from "@mui/material"
import { Edit, Save, Cancel, Add, CheckCircle } from "@mui/icons-material"
import axiosInstance from "../utils/axiosConfig"

export default function SizeInventoryDialog({ open, onClose, product, onInventoryUpdated }) {
  const [sizeInventory, setSizeInventory] = useState([])
  const [editingSize, setEditingSize] = useState(null)
  const [editQuantity, setEditQuantity] = useState("")
  const [newSize, setNewSize] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    title: '',
    message: ''
  })

  useEffect(() => {
    if (open && product) {
      setSizeInventory(product.sizeInventory || [])
      setError("")
    }
  }, [open, product])

  const handleEditStart = (size, currentQuantity) => {
    setEditingSize(size.size)
    setEditQuantity(currentQuantity.toString())
  }

  const handleEditCancel = () => {
    setEditingSize(null)
    setEditQuantity("")
  }

  const showSuccessDialog = (title, message) => {
    setSuccessDialog({
      open: true,
      title,
      message
    })
  }

  const closeSuccessDialog = () => {
    setSuccessDialog({
      open: false,
      title: '',
      message: ''
    })
  }

  const handleEditSave = async (size) => {
    try {
      setLoading(true)
      setError("")
      
      const quantity = parseInt(editQuantity)
      if (isNaN(quantity) || quantity < 0) {
        setError("Please enter a valid quantity (0 or greater)")
        return
      }

      await axiosInstance.put(`/admin/products/${product.id}/inventory/${size}`, null, {
        params: { quantity }
      })

      // Update local state
      setSizeInventory(prev => 
        prev.map(inv => 
          inv.size === size 
            ? { ...inv, totalQuantity: quantity, availableQuantity: quantity - (inv.reservedQuantity || 0) }
            : inv
        )
      )

      setEditingSize(null)
      setEditQuantity("")
      
      // Show success dialog
      showSuccessDialog('Inventory Updated', `Stock for size ${size} has been successfully updated to ${quantity} units!`)
      
      if (onInventoryUpdated) {
        onInventoryUpdated()
      }
    } catch (error) {
      console.error('Error updating inventory:', error)
      setError('Failed to update inventory: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  const handleAddSize = async () => {
    try {
      setLoading(true)
      setError("")
      
      const quantity = parseInt(newQuantity)
      if (!newSize.trim()) {
        setError("Please enter a size")
        return
      }
      if (isNaN(quantity) || quantity < 0) {
        setError("Please enter a valid quantity (0 or greater)")
        return
      }

      // Check if size already exists
      if (sizeInventory.some(inv => inv.size === newSize.trim())) {
        setError("This size already exists")
        return
      }

      await axiosInstance.put(`/admin/products/${product.id}/inventory/${newSize.trim()}`, null, {
        params: { quantity }
      })

      // Add to local state
      setSizeInventory(prev => [
        ...prev,
        {
          size: newSize.trim(),
          totalQuantity: quantity,
          reservedQuantity: 0,
          availableQuantity: quantity,
          inStock: quantity > 0
        }
      ])

      setNewSize("")
      setNewQuantity("")
      setShowAddForm(false)
      
      // Show success dialog
      showSuccessDialog('Size Added', `Size ${newSize.trim()} with ${quantity} units has been successfully added!`)
      
      if (onInventoryUpdated) {
        onInventoryUpdated()
      }
    } catch (error) {
      console.error('Error adding size inventory:', error)
      setError('Failed to add size inventory: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (inventory) => {
    const available = inventory.availableQuantity || 0
    if (available === 0) return { label: "Out of Stock", color: "error" }
    if (available <= 5) return { label: "Low Stock", color: "warning" }
    return { label: "In Stock", color: "success" }
  }

  const getTotalStock = () => {
    return sizeInventory.reduce((total, inv) => total + (inv.totalQuantity || 0), 0)
  }

  const getTotalAvailable = () => {
    return sizeInventory.reduce((total, inv) => total + (inv.availableQuantity || 0), 0)
  }

  const getTotalReserved = () => {
    return sizeInventory.reduce((total, inv) => total + (inv.reservedQuantity || 0), 0)
  }

  if (!product) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box>
          <Typography variant="h6">{product.name} - Size Inventory</Typography>
          <Typography variant="body2" color="textSecondary">
            Manage stock levels for each available size
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">{getTotalStock()}</Typography>
            <Typography variant="caption">Total Stock</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">{getTotalAvailable()}</Typography>
            <Typography variant="caption">Available</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" color="warning.main">{getTotalReserved()}</Typography>
            <Typography variant="caption">Reserved</Typography>
          </Paper>
        </Box>

        {/* Size Inventory Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell align="center">Total Stock</TableCell>
                <TableCell align="center">Reserved</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizeInventory.map((inventory) => {
                const isEditing = editingSize === inventory.size
                const stockStatus = getStockStatus(inventory)
                
                return (
                  <TableRow key={inventory.size}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {inventory.size}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          inputProps={{ min: 0 }}
                          sx={{ width: 80 }}
                        />
                      ) : (
                        <Typography variant="body2">
                          {inventory.totalQuantity || 0}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="warning.main">
                        {inventory.reservedQuantity || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="success.main">
                        {inventory.availableQuantity || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={stockStatus.label} 
                        color={stockStatus.color} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="center">
                      {isEditing ? (
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditSave(inventory.size)}
                            disabled={loading}
                          >
                            <Save />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleEditCancel}
                            disabled={loading}
                          >
                            <Cancel />
                          </IconButton>
                        </Box>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => handleEditStart(inventory, inventory.totalQuantity)}
                          disabled={loading}
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
              
              {/* Add new size row */}
              {showAddForm && (
                <TableRow>
                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Size"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      size="small"
                      type="number"
                      placeholder="Qty"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      inputProps={{ min: 0 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={handleAddSize}
                        disabled={loading}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setShowAddForm(false)
                          setNewSize("")
                          setNewQuantity("")
                        }}
                        disabled={loading}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!showAddForm && (
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<Add />}
              onClick={() => setShowAddForm(true)}
              disabled={loading}
            >
              Add Size
            </Button>
          </Box>
        )}

        {sizeInventory.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="textSecondary">
              No size inventory found. Add sizes to start managing inventory.
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Close
        </Button>
      </DialogActions>

      {/* Success Dialog */}
      <Dialog open={successDialog.open} onClose={closeSuccessDialog}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircle color="success" />
          {successDialog.title}
        </DialogTitle>
        <DialogContent>
          <Typography>{successDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSuccessDialog} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
