import { useState, useEffect } from "react"
import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material"
import { Inventory, ShoppingCart, TrendingUp, People, Add, ViewList } from "@mui/icons-material"
import axiosInstance from "../utils/axiosConfig"
import "../css/DashboardPage.css"

export default function DashboardPage({ onNavigate, onLogout, notifications, onMarkAsRead, onMarkAllAsRead, adminUser }) {
  const [stats, setStats] = useState([
    { title: "Total Products", value: "0", icon: Inventory, color: "#000000" },
    { title: "Pending Orders", value: "0", icon: ShoppingCart, color: "#ff6900" },
    { title: "Monthly Revenue", value: "$0", icon: TrendingUp, color: "#28a745" },
    { title: "Active Customers", value: "0", icon: People, color: "#6f42c1" },
  ])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const quickActions = [
    {
      title: "Add New Product",
      description: "Add shoes to your inventory",
      icon: Add,
      action: () => onNavigate("inventory"),
      color: "#000000",
    },
    {
      title: "View Inventory",
      description: "Manage existing products",
      icon: ViewList,
      action: () => onNavigate("inventory"),
      color: "#ff6900",
    },
    {
      title: "Process Orders",
      description: "Handle customer orders",
      icon: ShoppingCart,
      action: () => onNavigate("orders"),
      color: "#28a745",
    },
  ]

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      
      // Fetch dashboard stats from backend
      const response = await axiosInstance.get('/admin/stats')
      const dashboardData = response.data

      // Update stats with real data from backend
      const updatedStats = [
        { 
          title: "Total Products", 
          value: dashboardData.totalProducts?.toString() || "0", 
          icon: Inventory, 
          color: "#000000"
        },
        { 
          title: "Pending Orders", 
          value: dashboardData.pendingOrders?.toString() || "0", 
          icon: ShoppingCart, 
          color: "#ff6900"
        },
        { 
          title: "Monthly Revenue", 
          value: `₱${dashboardData.totalRevenue?.toLocaleString() || "0"}`, 
          icon: TrendingUp, 
          color: "#28a745"
        },
        { 
          title: "Active Customers", 
          value: dashboardData.totalUsers?.toString() || "0", 
          icon: People, 
          color: "#6f42c1"
        },
      ]

      setStats(updatedStats)
      setError('')
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setError('Failed to load dashboard statistics')
      
      // If unauthorized, handle logout
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        onLogout()
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <Container maxWidth="xl" className="dashboard-content">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography variant="h6" color="white">Loading dashboard...</Typography>
          </Box>
        </Container>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Container maxWidth="xl" className="dashboard-content">
        {error && (
          <Box mb={3}>
            <Typography color="error" variant="body1" style={{ color: '#ff6900' }}>
              {error}
            </Typography>
          </Box>
        )}

        <Box className="dashboard-header">
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h4" className="dashboard-welcome">
              ADMIN
            </Typography>
            <Button 
              variant="outlined" 
              onClick={onLogout}
              style={{ color: '#ff6900', borderColor: '#ff6900' }}
            >
              Logout
            </Button>
          </Box>
          <Typography variant="body1" className="dashboard-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Grid container spacing={3} className="stats-grid">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card className="stat-card">
                <CardContent className="stat-content">
                  <Box className="stat-header">
                    <Box className="stat-icon-container" style={{ backgroundColor: `${stat.color}15` }}>
                      <stat.icon className="stat-icon" style={{ color: stat.color }} />
                    </Box>
                  </Box>
                  <Typography variant="h4" className="stat-value">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" className="stat-title">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="quick-actions-section">
          <Typography variant="h5" className="section-title">
            Quick Actions
          </Typography>
          <Grid container spacing={3} className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="action-card" onClick={action.action}>
                  <CardContent className="action-content">
                    <Box className="action-icon-container" style={{ backgroundColor: `${action.color}15` }}>
                      <action.icon className="action-icon" style={{ color: action.color }} />
                    </Box>
                    <Typography variant="h6" className="action-title">
                      {action.title}
                    </Typography>
                    <Typography variant="body2" className="action-description">
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={3} className="management-section">
          <Grid item xs={12} md={6}>
            <Card className="management-card">
              <CardContent>
                <Typography variant="h6" className="management-title">
                  Inventory Management
                </Typography>
                <Typography variant="body2" className="management-description">
                  Manage your shoe inventory, add new products, update stock levels, and track product performance.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Inventory />}
                  onClick={() => onNavigate("inventory")}
                  className="management-button"
                  fullWidth
                >
                  Manage Inventory
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="management-card">
              <CardContent>
                <Typography variant="h6" className="management-title">
                  Orders Management
                </Typography>
                <Typography variant="body2" className="management-description">
                  Process customer orders, update payment status, manage deliveries, and handle returns.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCart />}
                  onClick={() => onNavigate("orders")}
                  className="management-button-outlined"
                  fullWidth
                >
                  Manage Orders
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
