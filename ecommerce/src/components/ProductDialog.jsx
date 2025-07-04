import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material"

export default function ProductDialog({ 
  open, 
  onClose, 
  onSave, 
  editingProduct, 
  brandOptions = [], 
  categoryOptions = [] 
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    color: "",
    image: "",
    rating: "4.5",
    availableSizes: '["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]'
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price?.toString() || "",
        brand: editingProduct.brand || "",
        category: editingProduct.category || "",
        color: editingProduct.color || "",
        // Use original backend image field for editing, not the mapped frontend image
        image: editingProduct.originalImage || editingProduct.image || "",
        rating: editingProduct.rating?.toString() || "4.5",
        availableSizes: editingProduct.availableSizes || '["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]'
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        color: "",
        image: "",
        rating: "4.5",
        availableSizes: '["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]'
      })
    }
    setErrors({})
  }, [editingProduct, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!formData.color.trim()) {
      newErrors.color = "Color is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      image: "",
      rating: "4.5",
      availableSizes: '["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]'
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="dialog-title">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={3}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                startAdornment: <Typography>₱</Typography>,
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.brand} required>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                label="Brand"
              >
                {brandOptions.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
              {errors.brand && (
                <Typography variant="caption" color="error" style={{ marginLeft: 14, marginTop: 4 }}>
                  {errors.brand}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.category} required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {categoryOptions.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" style={{ marginLeft: 14, marginTop: 4 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              error={!!errors.color}
              helperText={errors.color}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rating"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Available Sizes (JSON format)
            </Typography>
            <TextField
              fullWidth
              name="availableSizes"
              value={formData.availableSizes}
              onChange={handleChange}
              multiline
              rows={2}
              placeholder='["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]'
              helperText="Enter sizes in JSON array format. Initial inventory will be set to 0 for each size."
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
