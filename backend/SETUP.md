# Setup Guide for E-commerce Backend

## Quick Setup Instructions

### Step 1: Install Maven

Since Maven is not currently installed on your system, you have two options:

#### Option A: Install Maven (Recommended)
1. **Download Maven**: Go to https://maven.apache.org/download.cgi
2. **Download**: apache-maven-3.9.6-bin.zip (or latest version)
3. **Extract**: Extract to `C:\apache-maven-3.9.6`
4. **Add to PATH**: 
   - Open System Properties → Environment Variables
   - Add `C:\apache-maven-3.9.6\bin` to your PATH variable
   - Restart your terminal/VS Code

#### Option B: Use Maven Wrapper (Alternative)
If you have Maven available somewhere else, you can generate a Maven wrapper:
```bash
mvn wrapper:wrapper
```

### Step 2: Fix Java Version Compatibility

Your system has Java 23, but Spring Boot 3.2.0 works best with Java 17. You have two options:

#### Option A: Update pom.xml for Java 23
Update the `pom.xml` to use Java 23:
```xml
<properties>
    <java.version>23</java.version>
</properties>
```

#### Option B: Install Java 17 (Recommended for Spring Boot)
- Download Java 17 from Oracle or use OpenJDK
- Set JAVA_HOME to Java 17 installation

### Step 3: Create MySQL Database

Make sure you have MySQL running and create the database:
```sql
CREATE DATABASE dbshoestop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 4: Run the Application

After Maven is installed, use one of these scripts:
- `start-backend.bat` - Basic start script
- `start-backend.ps1` - PowerShell script
- `start-backend-auto.bat` - Auto-detection script

Or run manually:
```bash
mvn clean compile
mvn spring-boot:run
```

## Current Issues Fixed

✅ **Database Configuration**: Updated to use MySQL with `dbshoestop` database
✅ **pom.xml Formatting**: Fixed XML formatting issues
✅ **MySQL Connector**: Added proper MySQL connector dependency
✅ **Test Data Removed**: No DataInitializer creating test users

## Verification Steps

1. **Backend Running**: http://localhost:8080
2. **Test API**: Open `test-api.html` in browser
3. **Database Connection**: Check application logs for successful connection
4. **Frontend Integration**: Start React app and test login/register

## Troubleshooting

### Common Issues:

1. **"mvn not recognized"**: Maven not installed or not in PATH
2. **"SpringApplication cannot be resolved"**: Need to compile with Maven first
3. **Database connection errors**: Check MySQL is running and `dbshoestop` database exists
4. **Port 8080 in use**: Change server.port in application.properties

### Error Solutions:

- **Java version mismatch**: Update pom.xml java.version to match your Java installation
- **MySQL connection**: Verify username/password in application.properties
- **Dependencies not found**: Run `mvn clean install` to download dependencies

## Next Steps

1. Install Maven
2. Create MySQL database `dbshoestop`
3. Run `mvn clean compile` to verify setup
4. Start backend with `mvn spring-boot:run`
5. Test with frontend React application

The backend is fully configured for your `dbshoestop` MySQL database and ready to handle authentication requests from your React frontend.
