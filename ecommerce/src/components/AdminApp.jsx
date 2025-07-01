import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLoginPage from '../pages/AdminLoginPage'

import DashboardPage from '../pages/DashboardPage'
import AdminInventoryPage from '../pages/AdminInventoryPage'
import AdminOrdersPage from '../pages/AdminOrdersPage'

const AdminApp = () => {
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
        element={<AdminLoginPage onLogin={handleAdminLogin} />} 
      />
      <Route 
        path="/dashboard" 
        element={
          adminUser && adminUser.role === 'ADMIN' ? (
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
          adminUser && adminUser.role === 'ADMIN' ? (
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
          adminUser && adminUser.role === 'ADMIN' ? (
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
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}

export default AdminApp
