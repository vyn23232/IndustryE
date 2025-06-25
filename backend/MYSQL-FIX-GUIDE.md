# MYSQL AUTHENTICATION FIX GUIDE

## Current Issue
Your Spring Boot application is failing to connect to MySQL with this error:
```
Access denied for user 'root'@'localhost' (using password: NO)
```

## Quick Solutions (Try these in order)

### 1. Find Your MySQL Root Password
Your MySQL root user has a password. Here's how to find/test it:

**Option A: Try common passwords**
I've already set the password to "root" in your application.properties. If that doesn't work, try these:

1. Open `application.properties` and change the password line to:
   ```properties
   spring.datasource.password=password
   ```

2. Or try:
   ```properties
   spring.datasource.password=123456
   ```

3. Or try:
   ```properties
   spring.datasource.password=admin
   ```

**Option B: Test MySQL connection manually**
1. Open Command Prompt or PowerShell
2. Try: `mysql -u root -proot`
3. If that fails, try: `mysql -u root -ppassword`
4. If that fails, try: `mysql -u root -p123456`
5. If none work, you need to reset the password (see below)

### 2. Reset MySQL Root Password (if needed)

**Windows Method:**
1. Stop MySQL service:
   ```cmd
   net stop mysql
   ```

2. Start MySQL in safe mode:
   ```cmd
   mysqld --skip-grant-tables --skip-networking
   ```

3. In another terminal, connect without password:
   ```cmd
   mysql -u root
   ```

4. Reset the password:
   ```sql
   USE mysql;
   UPDATE user SET authentication_string = PASSWORD('newpassword') WHERE User = 'root';
   FLUSH PRIVILEGES;
   quit;
   ```

5. Stop and restart MySQL service normally:
   ```cmd
   net stop mysql
   net start mysql
   ```

### 3. Create a Dedicated Database User (Recommended)

Instead of using root, create a dedicated user:

1. Connect to MySQL as root:
   ```cmd
   mysql -u root -p
   ```

2. Create user and database:
   ```sql
   CREATE DATABASE IF NOT EXISTS dbshoestop;
   CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce_pass';
   GRANT ALL PRIVILEGES ON dbshoestop.* TO 'ecommerce_user'@'localhost';
   FLUSH PRIVILEGES;
   quit;
   ```

3. Update your `application.properties`:
   ```properties
   spring.datasource.username=ecommerce_user
   spring.datasource.password=ecommerce_pass
   ```

### 4. Verify Database Exists

Make sure the database exists:
```sql
mysql -u root -p
SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS dbshoestop;
USE dbshoestop;
```

## Testing Your Fix

1. Update the password in `application.properties`
2. Run the application using one of these methods:

**Method A: Using batch file (if Maven is installed)**
```cmd
start-backend.bat
```

**Method B: Using PowerShell script**
```powershell
.\start-backend.ps1
```

**Method C: Manual Maven command (if Maven is in PATH)**
```cmd
mvn spring-boot:run
```

**Method D: Run the JAR directly**
```cmd
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

## Current Configuration Files

I've created several configuration files for you to test:

1. **application.properties** - Currently set to password "root"
2. **application-no-password.properties** - Empty password
3. **application-password.properties** - Password set to "password"

To use an alternative config, rename it to `application.properties` or run with:
```cmd
mvn spring-boot:run -Dspring.profiles.active=no-password
```

## Success Indicators

When the connection works, you should see:
- No more "Access denied" errors
- Log messages like "HikariPool-1 - Start completed"
- "Started EcommerceBackendApplication in X.X seconds"
- Server starts on port 8080

## Still Having Issues?

If none of these work:
1. Check if MySQL service is running: `net start mysql`
2. Try connecting with MySQL Workbench or another GUI tool
3. Check MySQL error logs for more details
4. Consider using XAMPP or WAMP which include MySQL with default settings
