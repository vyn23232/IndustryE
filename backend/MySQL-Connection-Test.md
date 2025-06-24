# MySQL Connection Troubleshooting

## Common MySQL Passwords to Try

Your application.properties currently has password set to "root". If this doesn't work, try these common passwords:

1. **Empty password** (original setting):
   ```properties
   spring.datasource.password=
   ```

2. **"root"** (current setting):
   ```properties
   spring.datasource.password=root
   ```

3. **"password"**:
   ```properties
   spring.datasource.password=password
   ```

4. **"123456"**:
   ```properties
   spring.datasource.password=123456
   ```

5. **"admin"**:
   ```properties
   spring.datasource.password=admin
   ```

## How to Find Your MySQL Root Password

### Method 1: Check MySQL Configuration
```bash
# In MySQL Command Line Client or MySQL Workbench, run:
SELECT user, host, authentication_string FROM mysql.user WHERE user = 'root';
```

### Method 2: Reset MySQL Root Password
If you forgot the password, you can reset it:

1. Stop MySQL service
2. Start MySQL with skip-grant-tables
3. Reset the password
4. Restart MySQL normally

### Method 3: Create a New Database User
Instead of using root, create a dedicated user:

```sql
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce_password';
GRANT ALL PRIVILEGES ON dbshoestop.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;
```

Then update application.properties:
```properties
spring.datasource.username=ecommerce_user
spring.datasource.password=ecommerce_password
```

## Testing MySQL Connection Manually

Test connection in command line:
```bash
mysql -u root -p
```

Or with specific password:
```bash
mysql -u root -pYOUR_PASSWORD -e "SHOW DATABASES;"
```

## Ensure Database Exists

Make sure the database 'dbshoestop' exists:
```sql
CREATE DATABASE IF NOT EXISTS dbshoestop;
USE dbshoestop;
SHOW TABLES;
```
