import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { 
  Search, 
  People, 
  AdminPanelSettings, 
  Edit, 
  Visibility,
  MoreVert 
} from "@mui/icons-material"
import axiosInstance from "../utils/axiosConfig"
import PageHeader from "../components/PageHeader"
import "../css/AdminDashboard.css"

export default function AdminUsersPage({ onNavigate }) {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/admin/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to fetch users')
      
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEditRole = (user) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setEditDialogOpen(true)
  }

  const handleUpdateRole = async () => {
    try {
      await axiosInstance.put(`/admin/users/${selectedUser.id}/role`, null, {
        params: { role: newRole }
      })
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      )
      
      setEditDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error updating user role:', error)
      setError('Failed to update user role')
    }
  }

  const getFilteredUsers = () => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'error'
      case 'USER':
        return 'primary'
      default:
        return 'default'
    }
  }

  const totalUsers = users.length
  const adminUsers = users.filter(user => user.role === 'ADMIN').length
  const regularUsers = users.filter(user => user.role === 'USER').length

  if (loading) {
    return (
      <div className="dashboard-container">
        <PageHeader title="User Management" onBack={() => onNavigate("dashboard")} />
        <Container maxWidth="xl" className="dashboard-content">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        </Container>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <PageHeader title="User Management" onBack={() => onNavigate("dashboard")} />

      <Container maxWidth="xl" className="dashboard-content">
        {error && (
          <Alert severity="error" style={{ marginBottom: 24 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} style={{ marginBottom: 24 }}>
          <Grid item xs={12} sm={4}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <People className="stat-icon" />
                  <Typography variant="h4">{totalUsers}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Total Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <AdminPanelSettings className="stat-icon" style={{ color: '#ff6900' }} />
                  <Typography variant="h4">{adminUsers}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Admin Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="stat-card">
              <CardContent>
                <Box className="stat-header">
                  <People className="stat-icon" style={{ color: '#28a745' }} />
                  <Typography variant="h4">{regularUsers}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Regular Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search */}
        <Box style={{ marginBottom: 24 }}>
          <TextField
            placeholder="Search users by name, email, or role..."
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
            style={{ width: '100%', maxWidth: 400 }}
          />
        </Box>

        {/* Users Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredUsers().map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="600">
                          {user.name}
                        </Typography>
                        {user.bio && (
                          <Typography variant="caption" color="textSecondary">
                            {user.bio}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={getRoleColor(user.role)} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>{user.location || 'N/A'}</TableCell>
                    <TableCell>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        onClick={() => handleEditRole(user)} 
                        size="small"
                        title="Edit Role"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {getFilteredUsers().length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="textSecondary" style={{ padding: '40px 0' }}>
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit User Role</DialogTitle>
          <DialogContent>
            <Box style={{ minWidth: 300, paddingTop: 16 }}>
              <Typography variant="body2" style={{ marginBottom: 16 }}>
                Change role for: <strong>{selectedUser?.name}</strong>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateRole} variant="contained">
              Update Role
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  )
}
