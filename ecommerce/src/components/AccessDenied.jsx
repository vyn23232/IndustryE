import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, Button } from '@mui/material'
import { Warning } from '@mui/icons-material'
import '../css/AccessDenied.css'


const AccessDenied = ({ redirectPath = '/shoes', message = 'Access denied. You are not authorized to view this page.' }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectPath)
    }, 100000)
    return () => clearTimeout(timer)
  }, [navigate, redirectPath])

  return (
    <div className="access-denied-container">
      <Paper elevation={3} className="access-denied-paper" style={{ textAlign: 'center' }}>
        <Box className="access-denied-icon" mb={2}>
          <Warning style={{ fontSize: 64, color: '#ff2222', marginBottom: 8 }} />
        </Box>
        <Typography variant="h4" className="access-denied-title" gutterBottom>
          Access Denied
        </Typography>
        <Box style={{ color: '#rgb(178 29 29)', borderRadius: 8, padding: '1rem 0.75rem', margin: '1rem 0', fontWeight: 500, fontSize: '1.1rem', letterSpacing: 0.5, }}>
          {message}
          <br />
          <span style={{ color: '#ff8888', fontSize: '0.98rem', fontWeight: 400 }}>You will be redirected shortly.</span>
        </Box>
        <Button
          variant="contained"
          color="error"
          style={{ marginTop: 24, borderRadius: 8, fontWeight: 600 }}
          onClick={() => navigate(redirectPath)}
        >
          Return to Home
        </Button>
      </Paper>
    </div>
  )
}

export default AccessDenied
