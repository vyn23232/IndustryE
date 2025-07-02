import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Paper, TextField, Button, Typography, Box, Alert, InputAdornment, IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import axiosInstance, { API_BASE_URL } from "../utils/axiosConfig"
import "../css/AdminLoginPage.css"

export default function AdminLoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Use the backend authentication API
      const response = await axiosInstance.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })

      if (response.data && response.data.user) {
        // Check if user has admin role
        if (response.data.user.role === 'ADMIN') {
          // Store admin token and user data
          localStorage.setItem('adminToken', response.data.token)
          localStorage.setItem('adminUser', JSON.stringify(response.data.user))
          
          // Call the onLogin callback to update app state
          onLogin(response.data.user)
          
          // Navigate to admin dashboard
          navigate('/admin/dashboard')
        } else {
          setError("Access denied. Admin privileges required.")
        }
      } else {
        setError("Invalid response from server")
      }
    } catch (error) {
      console.error('Admin login error:', error)
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else if (error.response?.status === 401) {
        setError("Invalid email or password")
      } else if (error.response?.status === 403) {
        setError("Access denied. Admin privileges required.")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <Container maxWidth="sm">
        <Paper 
          elevation={0} 
          className="admin-login-paper"
        >
          <Box className="admin-login-header">
            <Typography 
              variant="h4" 
              component="h1" 
              className="admin-brand-name"
            >
              ADMIN
            </Typography>
            <Typography 
              variant="h6" 
              className="admin-login-title"
            >
              Admin Portal
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <Alert 
                severity="error" 
                className="admin-login-alert"
              >
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              variant="outlined"
              required
              className="admin-login-field"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleInputChange}
              variant="outlined"
              required
              className="admin-login-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                      size="small"
                      tabIndex={-1} // Prevents double focus
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="admin-login-button"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}
