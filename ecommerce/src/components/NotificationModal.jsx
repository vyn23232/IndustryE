"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material"
import { ShoppingCart, Inventory, Payment, Warning, CheckCircle, Close, MarkEmailRead } from "@mui/icons-material"
import { formatDistanceToNow } from "date-fns"
import "../css/NotificationModal.css"

export default function NotificationModal({ open, onClose, notifications, onMarkAsRead, onMarkAllAsRead, onNavigate }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart />
      case "inventory":
        return <Inventory />
      case "payment":
        return <Payment />
      default:
        return <Warning />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case "order":
        return "#28a745"
      case "inventory":
        return "#ff6900"
      case "payment":
        return "#007bff"
      default:
        return "#6c757d"
    }
  }

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }

    if (notification.type === "order" && onNavigate) {
      onNavigate("orders")
      onClose()
    } else if (notification.type === "inventory" && onNavigate) {
      onNavigate("inventory")
      onClose()
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="notification-modal">
      <DialogTitle className="notification-header">
        <Box className="notification-title-section">
          <Typography variant="h6" className="notification-title">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip label={`${unreadCount} unread`} size="small" color="error" className="unread-chip" />
          )}
        </Box>
        <Box className="notification-actions">
          {unreadCount > 0 && (
            <Button size="small" startIcon={<MarkEmailRead />} onClick={onMarkAllAsRead} className="mark-all-read-btn">
              Mark all read
            </Button>
          )}
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent className="notification-content">
        {notifications.length === 0 ? (
          <Box className="empty-notifications">
            <CheckCircle className="empty-icon" />
            <Typography variant="body1" color="textSecondary">
              No notifications
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You're all caught up!
            </Typography>
          </Box>
        ) : (
          <List className="notification-list">
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  className={`notification-item ${!notification.read ? "unread" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <ListItemAvatar>
                    <Avatar
                      className="notification-avatar"
                      style={{ backgroundColor: getNotificationColor(notification.type) }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box className="notification-primary">
                        <Typography
                          variant="body2"
                          className={`notification-title-text ${!notification.read ? "unread-text" : ""}`}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && <Box className="unread-dot" />}
                      </Box>
                    }
                    secondary={
                      <Box className="notification-secondary">
                        <Typography variant="body2" color="textSecondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" className="notification-time">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions className="notification-footer">
        <Button onClick={onClose} variant="outlined" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
