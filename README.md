# IndustryE - Full-Stack E-Commerce Platform

A modern e-commerce platform built with React frontend and Spring Boot backend, featuring user authentication, product catalog, and shopping cart functionality.

## 🚀 Features

### Frontend (React)
- Modern, responsive UI with custom CSS
- User authentication (login/register)
- Product catalog with detailed views
- Shopping cart functionality
- User profile management
- Toast notifications
- Landing page with navigation

### Backend (Spring Boot)
- JWT-based authentication
- RESTful API endpoints
- Password encryption with BCrypt
- Spring Security configuration
- H2 database for development
- CORS configuration for frontend integration

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **CSS3** - Styling
- **JavaScript ES6+** - Programming language

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data access
- **H2 Database** - In-memory database (development)
- **JWT** - Token-based authentication
- **Maven** - Build tool

## 📁 Project Structure

```
IndustryE/
├── ecommerce/          # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── css/        # Styling files
│   │   └── assets/     # Static assets
│   ├── public/
│   └── package.json
├── backend/            # Spring Boot Backend
│   ├── src/main/java/com/industryE/ecommerce/
│   │   ├── config/     # Configuration classes
│   │   ├── controller/ # REST controllers
│   │   ├── dto/        # Data transfer objects
│   │   ├── entity/     # JPA entities
│   │   ├── repository/ # Data repositories
│   │   ├── security/   # Security components
│   │   └── service/    # Business logic
│   ├── src/main/resources/
│   └── pom.xml
└── README.md          # This file
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java 17** or higher
- **Maven 3.6** or higher

### 1. Clone the Repository
```bash
git clone <repository-url>
cd IndustryE
```

### 2. Start the Backend
```bash
cd backend

# Using PowerShell
./start-backend.ps1

# Or using Command Prompt
start-backend.bat

# Or manually
mvn clean install
mvn spring-boot:run
```

The backend will be available at:
- **API**: `http://localhost:8080`
- **H2 Console**: `http://localhost:8080/h2-console`

### 3. Start the Frontend
```bash
cd ecommerce
npm install
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 🔑 Authentication

### Default Test User
- **Email**: `test@example.com`
- **Password**: `password123`

### API Endpoints

#### Register
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: BCrypt encryption for secure password storage
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Bean validation for all API requests
- **Spring Security**: Comprehensive security configuration

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface
- **Interactive Components**: Product modals, cart management
- **Toast Notifications**: User feedback for actions
- **Authentication Flow**: Seamless login/register experience

## 🛒 E-Commerce Features

- **Product Catalog**: Browse shoes with detailed information
- **Shopping Cart**: Add, remove, and modify cart items
- **User Profiles**: Manage personal information and preferences
- **Authentication**: Secure user registration and login
- **Responsive Navigation**: Easy-to-use navigation system

## 🔧 Development

### Frontend Development
```bash
cd ecommerce
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
cd backend
mvn spring-boot:run  # Start development server
mvn test            # Run tests
mvn clean install   # Build project
```

### Database Access
- **H2 Console**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (empty)

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user

### Protected Endpoints (require JWT token)
- Future endpoints for products, orders, etc.

## 🚧 Roadmap

- [ ] Product management API
- [ ] Order management system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Search and filtering
- [ ] Wishlist functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
