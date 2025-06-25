# E-Commerce Backend

This is a Spring Boot backend application for an e-commerce platform with user authentication and authorization.

## Features

- User Registration and Login
- JWT Token-based Authentication
- Password Encryption with BCrypt
- Spring Security Configuration
- H2 In-memory Database (for development)
- RESTful API endpoints
- CORS Configuration for frontend integration

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **H2 Database** (for development)
- **JWT** (JSON Web Tokens)
- **Maven** (build tool)

## Project Structure

```
src/main/java/com/industryE/ecommerce/
├── config/
│   └── SecurityConfig.java          # Security configuration
├── controller/
│   └── AuthController.java          # Authentication endpoints
├── dto/
│   ├── AuthResponse.java           # Authentication response DTO
│   ├── LoginRequest.java           # Login request DTO
│   ├── RegisterRequest.java        # Registration request DTO
│   └── UserResponse.java           # User response DTO
├── entity/
│   └── User.java                   # User entity
├── repository/
│   └── UserRepository.java         # User repository
├── security/
│   ├── JwtAuthenticationFilter.java # JWT filter
│   └── JwtTokenProvider.java       # JWT utility
├── service/
│   ├── AuthService.java            # Authentication service
│   └── CustomUserDetailsService.java # User details service
└── EcommerceBackendApplication.java # Main application class
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-06-25T10:30:00"
  },
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-06-25T10:30:00"
  },
  "message": "Login successful"
}
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:
   ```bash
   java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
   ```

4. **Access the application**
   - API Base URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Username: `sa`
     - Password: (leave empty)

## Configuration

### Database Configuration

The application uses H2 in-memory database for development. To use a different database:

1. Add the database dependency in `pom.xml`
2. Update `application.properties` with your database configuration

Example for MySQL:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### JWT Configuration

Update JWT secret and expiration in `application.properties`:
```properties
app.jwt-secret=your-secret-key-here
app.jwt-expiration-milliseconds=86400000
```

### CORS Configuration

CORS is configured to allow all origins for development. Update `SecurityConfig.java` for production:
```java
configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
```

## Security Features

- **Password Encryption**: Uses BCrypt for secure password hashing
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **CORS Protection**: Configurable CORS policy
- **Input Validation**: Bean validation for request DTOs
- **Exception Handling**: Proper error responses for authentication failures

## Frontend Integration

The backend is configured to work with the React frontend. Update your frontend API calls to use the backend endpoints:

```javascript
// Login example
const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password
  })
});

const data = await response.json();

if (response.ok) {
  // Store token for future requests
  localStorage.setItem('token', data.token);
  // Handle successful login
  onLogin(data.user);
} else {
  // Handle error
  console.error(data.message);
}
```

## Development Notes

- The application uses an in-memory H2 database that resets on each restart
- JWT tokens expire after 24 hours by default
- All API endpoints except authentication are protected
- CORS is enabled for all origins in development mode

## Next Steps

1. Add product management endpoints
2. Implement user profile management
3. Add shopping cart functionality
4. Integrate with a persistent database
5. Add unit and integration tests
6. Implement proper logging and monitoring
