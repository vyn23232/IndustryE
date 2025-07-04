import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  InputAdornment,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Add, Search, FilterList, Inventory, TrendingUp, Warning, Store, CheckCircle } from "@mui/icons-material"
import axiosInstance from "../utils/axiosConfig"
import { mapProductWithImages } from "../utils/imageMapper"
import "../css/InventoryManagement.css"
import ProductTable from "../components/ProductTable"
import ProductDialog from "../components/ProductDialog"
import SizeInventoryDialog from "../components/SizeInventoryDialog"

const brandOptions = ["Nike", "Adidas", "Jordan", "Converse", "Puma", "New Balance"]
const categoryOptions = ["basketball", "running", "lifestyle", "casual", "sports", "training", "limited"]

export default function AdminInventoryPage({ onNavigate, adminUser }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [inventoryDialogOpen, setInventoryDialogOpen] = useState(false)
  const [selectedProductForInventory, setSelectedProductForInventory] = useState(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    totalBrands: 0
  })
  const [successDialog, setSuccessDialog] = useState({
    open: false,
    title: '',
    message: ''
  })

  useEffect(() => {
    // Check if user is admin
    if (!adminUser || adminUser.role !== 'ADMIN') {
      navigate('/admin/login')
      return
    }
    
    const loadData = async () => {
      await fetchStats()
      await fetchProducts()
    }
    
    loadData()
  }, [adminUser, navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/admin/products')
      
      // Transform backend data to match frontend format with proper images
      const transformedProducts = response.data.map(product => {
        // Map product with images using imageMapper
        const productWithImages = mapProductWithImages(product)
        
        return {
          id: product.id,
          name: product.name,
          brand: product.brand || 'Unknown',
          price: product.price,
          stock: getTotalStock(product.sizeInventory || []),
          size: 'Multiple', // Since we have size inventory
          color: product.color || 'Default',
          category: product.category,
          sku: `SKU-${product.id}`,
          image: productWithImages.image, // Use mapped image
          images: productWithImages.images, // Use mapped images array
          description: product.description,
          availableSizes: product.availableSizes,
          rating: product.rating || 4.5,
          sizeInventory: product.sizeInventory || [],
          inStock: product.inStock,
          // Store original backend image field for persistence
          originalImage: product.image
        }
      })
      
      setProducts(transformedProducts)
      
      // Calculate additional stats from loaded products
      calculateFrontendStats(transformedProducts)
      
      setError('')
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products')
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/admin/stats')
      const statsData = response.data
      
      setStats({
        totalProducts: statsData.totalProducts || 0,
        totalValue: 0, // Will be calculated after products are loaded
        lowStockItems: statsData.lowStockProducts || 0,
        totalBrands: 0 // Will be calculated after products are loaded
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const calculateFrontendStats = (loadedProducts) => {
    const totalValue = loadedProducts.reduce((sum, product) => sum + (product.price * product.stock), 0)
    const uniqueBrands = [...new Set(loadedProducts.map(p => p.brand))].length
    
    setStats(prevStats => ({
      ...prevStats,
      totalValue: totalValue,
      totalBrands: uniqueBrands
    }))
  }

  const getTotalStock = (sizeInventory) => {
    if (!Array.isArray(sizeInventory)) return 0
    return sizeInventory.reduce((total, inv) => total + (inv.totalQuantity || inv.quantity || 0), 0)
  }

  const handleOpenDialog = (product) => {
    setEditingProduct(product || null)
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setEditingProduct(null)
  }

  const handleManageInventory = (product) => {
    setSelectedProductForInventory(product)
    setInventoryDialogOpen(true)
  }

  const handleCloseInventoryDialog = () => {
    setInventoryDialogOpen(false)
    setSelectedProductForInventory(null)
  }

  const handleInventoryUpdated = async () => {
    // Refresh products and stats when inventory is updated
    console.log('Refreshing products after inventory update...')
    await fetchProducts()
    await fetchStats()
    showSuccessDialog('Inventory Updated', 'Product inventory has been successfully updated!')
  }

  const handleSave = async (productData) => {
    try {
      const apiData = {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        availableSizes: productData.availableSizes,
        category: productData.category,
        // Use original backend image field for updates, or the new image for creates
        image: editingProduct ? (editingProduct.originalImage || productData.image) : productData.image,
        color: productData.color,
        brand: productData.brand,
        rating: parseFloat(productData.rating || 4.5),
        inStock: true
      }

      if (editingProduct) {
        // Update existing product
        console.log('Updating product:', editingProduct.id, 'with image:', apiData.image)
        await axiosInstance.put(`/admin/products/${editingProduct.id}`, apiData)
        showSuccessDialog('Product Updated', `${productData.name} has been successfully updated!`)
      } else {
        // Create new product
        console.log('Creating new product with image:', apiData.image)
        await axiosInstance.post('/admin/products', apiData)
        showSuccessDialog('Product Created', `${productData.name} has been successfully created!`)
      }

      console.log('Refreshing products after save...')
      await fetchProducts()
      await fetchStats()
      handleCloseDialog()
      setError('')
    } catch (error) {
      console.error('Error saving product:', error)
      setError('Failed to save product: ' + (error.response?.data?.error || error.message))
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This will also delete all associated inventory records.')) {
      try {
        const productToDelete = products.find(p => p.id === id)
        console.log('Deleting product:', id, productToDelete?.name)
        await axiosInstance.delete(`/admin/products/${id}`)
        console.log('Refreshing products after delete...')
        await fetchProducts()
        await fetchStats()
        setError('')
        showSuccessDialog('Product Deleted', `${productToDelete?.name || 'Product'} and all associated inventory records have been successfully deleted!`)
      } catch (error) {
        console.error('Error deleting product:', error)
        const errorMessage = error.response?.data?.error || error.message || 'Failed to delete product'
        setError(`Failed to delete product: ${errorMessage}`)
      }
    }
  }

  const updateInventory = async (productId, size, quantity) => {
    try {
      await axiosInstance.put(`/admin/products/${productId}/inventory/${size}`, null, {
        params: { quantity }
      })
      
      // Refresh products to show updated inventory
      await fetchProducts()
      await fetchStats()
      setError('')
    } catch (error) {
      console.error('Error updating inventory:', error)
      setError('Failed to update inventory')
    }
  }

  const getFilteredProducts = () => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    switch (tabValue) {
      case 1: // Low Stock
        filtered = filtered.filter((product) => product.stock < 10 && product.stock > 0)
        break
      case 2: // Out of Stock
        filtered = filtered.filter((product) => product.stock === 0)
        break
      default: // All Products
        break
    }

    return filtered
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

  const filteredProducts = getFilteredProducts()

  if (loading) {
    return (
      <div className="inventory-container">
        <Container maxWidth="xl" className="inventory-content">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
            <Typography variant="h6" style={{ marginLeft: 16 }}>Loading inventory...</Typography>
          </Box>
        </Container>
      </div>
    )
  }

  return (
    <div className="inventory-container">
      <Container maxWidth="xl" className="inventory-content">
        {/* Header with Back Button */}
        <Box className="inventory-header" mb={3}>
          <Button 
            onClick={() => onNavigate("dashboard")}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            ← Back to Dashboard
          </Button>
          <Typography variant="h4" className="inventory-title">
            Inventory Management
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" style={{ marginBottom: 24 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} className="inventory-stats">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <Inventory className="stat-icon" />
                  <Typography variant="h4">{stats.totalProducts}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Total Products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <TrendingUp className="stat-icon" />
                  <Typography variant="h4">₱{stats.totalValue.toLocaleString()}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Inventory Value
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <Warning className="stat-icon warning" />
                  <Typography variant="h4">{stats.lowStockItems}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Low Stock Items
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <Store className="stat-icon" />
                  <Typography variant="h4">{stats.totalBrands}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Brands
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Controls */}
        <Box className="inventory-controls">
          <Box className="search-filter-section">
            <TextField
              placeholder="Search products, SKU, or brand..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className="search-field"
            />
            <Button variant="outlined" startIcon={<FilterList />} className="filter-button">
              Filter
            </Button>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()} className="add-button">
            Add Product
          </Button>
        </Box>

        {/* Tabs */}
        <Box className="inventory-tabs">
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`All Products (${products.length})`} />
            <Tab label={`Low Stock (${products.filter(p => p.stock < 10 && p.stock > 0).length})`} />
            <Tab label={`Out of Stock (${products.filter(p => p.stock === 0).length})`} />
          </Tabs>
        </Box>

        {/* Products Table */}
        <ProductTable 
          products={filteredProducts} 
          onEdit={handleOpenDialog} 
          onDelete={handleDelete}
          onManageInventory={handleManageInventory}
        />

        {/* Add/Edit Dialog */}
        <ProductDialog 
          open={open} 
          onClose={handleCloseDialog} 
          onSave={handleSave} 
          editingProduct={editingProduct} 
          brandOptions={brandOptions}
          categoryOptions={categoryOptions}
        />

        {/* Size Inventory Dialog */}
        <SizeInventoryDialog
          open={inventoryDialogOpen}
          onClose={handleCloseInventoryDialog}
          product={selectedProductForInventory}
          onInventoryUpdated={handleInventoryUpdated}
        />

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
      </Container>
    </div>
  )
}

export { brandOptions, categoryOptions }
