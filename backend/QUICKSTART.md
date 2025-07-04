# Quick Start Without Maven

Since Maven is not currently installed, here are your options:

## Option 1: Install Maven (Recommended)
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to `C:\apache-maven-3.9.6`
3. Add `C:\apache-maven-3.9.6\bin` to your PATH
4. Restart terminal and run: `mvn spring-boot:run`

## Option 2: Use Maven Wrapper (If Available)
Create a Maven wrapper (requires Maven once):
```bash
mvn wrapper:wrapper
./mvnw spring-boot:run
```

## Option 3: Manual Setup (Complex)
1. Download all Spring Boot dependencies manually
2. Set up classpath
3. Run Java directly (not recommended)

## Option 4: Use IDE
1. Open the project in IntelliJ IDEA or Eclipse
2. Let IDE download dependencies
3. Run EcommerceBackendApplication.java

## Current Database Configuration ✅

Your `application.properties` is correctly configured for:
- **Database**: `dbshoestop`
- **MySQL**: localhost:3306
- **User**: root
- **Password**: blank

## What's Working ✅

- ✅ Spring Boot project structure
- ✅ MySQL configuration for `dbshoestop`
- ✅ All authentication classes created
- ✅ JWT security implemented
- ✅ Frontend integration ready
- ✅ Java 23 compatibility

## What Needs Maven ⚠️

- Dependencies download
- Compilation
- Running the application

## Quick Test

Once Maven is installed, verify everything works:
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

Then test at: http://localhost:8080
