import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLoginPage from '../pages/AdminLoginPage'
import AccessDenied from './AccessDenied'

import DashboardPage from '../pages/DashboardPage'
import AdminInventoryPage from '../pages/AdminInventoryPage'
import AdminOrdersPage from '../pages/AdminOrdersPage'

const AdminApp = ({ isAuthenticated, user }) => {
  const navigate = useNavigate()
  const [adminUser, setAdminUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order', message: 'Order #1234 received', read: false, type: 'order', timestamp: new Date() },
    { id: 2, title: 'Low Stock Alert', message: 'Air Jordan 1 Low running low', read: false, type: 'inventory', timestamp: new Date() }
  ])

  useEffect(() => {
    // Check if admin is already logged in
    const savedAdminUser = localStorage.getItem('adminUser')
    const adminToken = localStorage.getItem('adminToken')
    
    if (savedAdminUser && adminToken) {
      try {
        setAdminUser(JSON.parse(savedAdminUser))
      } catch (error) {
        console.error('Error parsing saved admin user:', error)
        localStorage.removeItem('adminUser')
        localStorage.removeItem('adminToken')
      }
    }
    
    setIsLoading(false)
  }, [])

  const handleAdminLogin = (user) => {
    setAdminUser(user)
  }

  const handleAdminLogout = () => {
    setAdminUser(null)
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminToken')
  }

  const handleNavigate = (view) => {
    if (view === 'dashboard') {
      navigate('/admin/dashboard')
    } else if (view === 'inventory') {
      navigate('/admin/inventory')
    } else if (view === 'orders') {
      navigate('/admin/orders')
    }
  }

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((notif) => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          // If a regular user is logged in, show access denied page
          isAuthenticated && user && user.role !== 'ADMIN' ? 
          <AccessDenied 
            user={user} 
            message="You cannot access the admin panel while logged in as a regular user." 
          /> :
          <AdminLoginPage onLogin={handleAdminLogin} />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          // Check if regular user is trying to access admin dashboard
          isAuthenticated && user && user.role !== 'ADMIN' ? (
            <AccessDenied 
              user={user} 
              message="You cannot access the admin dashboard while logged in as a regular user." 
            />
          ) : adminUser && adminUser.role === 'ADMIN' ? (
            <DashboardPage
              adminUser={adminUser}
              onNavigate={handleNavigate}
              onLogout={handleAdminLogout}
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route 
        path="/inventory" 
        element={
          // Check if regular user is trying to access admin inventory
          isAuthenticated && user && user.role !== 'ADMIN' ? (
            <AccessDenied 
              user={user} 
              message="You cannot access the admin inventory while logged in as a regular user." 
            />
          ) : adminUser && adminUser.role === 'ADMIN' ? (
            <AdminInventoryPage
              adminUser={adminUser}
              onNavigate={handleNavigate}
              onLogout={handleAdminLogout}
            />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route 
        path="/orders" 
        element={
          // Check if regular user is trying to access admin orders
          isAuthenticated && user && user.role !== 'ADMIN' ? (
            <AccessDenied 
              user={user} 
              message="You cannot access the admin orders while logged in as a regular user." 
            />
          ) : adminUser && adminUser.role === 'ADMIN' ? (
            <AdminOrdersPage
              adminUser={adminUser}
              onNavigate={handleNavigate}
              onLogout={handleAdminLogout}
            />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route path="/" element={
        isAuthenticated && user && user.role !== 'ADMIN' ? 
        <AccessDenied 
          user={user} 
          message="You cannot access the admin panel while logged in as a regular user." 
        /> :
        <Navigate to="/admin/login" replace />
      } />
      <Route path="*" element={
        isAuthenticated && user && user.role !== 'ADMIN' ? 
        <AccessDenied 
          user={user} 
          message="You cannot access the admin panel while logged in as a regular user." 
        /> :
        <Navigate to="/admin/login" replace />
      } />
    </Routes>
  )
}

export default AdminApp
