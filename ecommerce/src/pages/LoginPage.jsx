import { useState } from 'react'
import '../css/AuthPage.css'

const LoginPage = ({ onLogin, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }    setIsLoading(true)
    
    // Connect to Spring Boot backend
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Store JWT token
        localStorage.setItem('token', data.token)
        onLogin(data.user)
      } else {
        setErrors({ general: data.message || 'Login failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ general: 'Connection error. Please make sure the server is running.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome Back!</h1>
            <p>Sign in to your MultiStore account</p>
          </div>          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message" style={{marginBottom: '15px', textAlign: 'center'}}>
                {errors.general}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-primary auth-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button 
                className="link-btn"
                onClick={() => setCurrentPage('signup')}
              >
                Sign Up
              </button>
            </p>
            <button 
              className="link-btn"
              onClick={() => setCurrentPage('landing')}
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="auth-image">
          <div className="image-content">
            <span style={{fontSize: '120px'}}>🔐</span>
            <h3>Secure Login</h3>
            <p>Your data is protected with advanced security measures</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
// END NEW CODE: Login page component