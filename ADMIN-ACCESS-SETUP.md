# Admin Access Setup Guide

## Issue Fixed: Admin Authentication

The admin authentication system has been corrected. The main issue was a mismatch between password encoding in the DataInitializer and plain text comparison in the AuthService.

## Admin Credentials

The system will automatically create an admin user when the backend starts:

```
Email: admin@shoestop.com
Password: admin123
Role: ADMIN
```

## Setup Steps

### 1. Start the Backend

First, make sure your MySQL database is running, then start the backend:

```bash
cd backend
mvn spring-boot:run
```

Or use the provided scripts:
- `start-backend.bat` (Windows)
- `start-backend.ps1` (PowerShell)

### 2. Check Admin User Creation

When the backend starts, you should see in the console:
```
Admin user created successfully
Email: admin@shoestop.com
Password: admin123
```

### 3. Start the Frontend

```bash
cd ecommerce
npm start
```

### 4. Test Admin Access

1. Navigate to `http://localhost:3000/admin/login`
2. Use credentials: `admin@shoestop.com` / `admin123`
3. Should successfully login and redirect to admin dashboard

## Database Verification

You can check if the admin user was created properly by running this MySQL query:

```sql
USE dbshoestop;
SELECT id, name, email, role FROM users WHERE role = 'ADMIN';
```

## Troubleshooting

### If admin login still fails:

1. **Check database connection**: Make sure the backend connected to MySQL successfully
2. **Clear localStorage**: In browser console, run `localStorage.clear()`
3. **Restart backend**: This will ensure the admin user is created
4. **Check user in database**: Verify the admin user exists with correct role

### Manual Admin User Creation

If automatic creation fails, you can manually create an admin user in MySQL:

```sql
USE dbshoestop;

INSERT INTO users (name, email, password, role, phone, location, bio, created_at, updated_at) 
VALUES (
    'Administrator', 
    'admin@shoestop.com', 
    'admin123', 
    'ADMIN', 
    '+1234567890', 
    'Admin Office', 
    'System Administrator', 
    NOW(), 
    NOW()
);
```

## Admin Features Now Available

Once logged in, admins can:

- **Dashboard**: View real-time statistics
- **Inventory Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: View customer accounts (backend support ready)

## Security Notes

- Admin routes are protected by JWT authentication
- Only users with ADMIN role can access admin features
- Automatic logout on token expiration
- All admin API endpoints require authentication

---

The admin system is now fully functional and integrated with the backend database.
