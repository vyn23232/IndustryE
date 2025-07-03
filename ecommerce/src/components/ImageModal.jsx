import React from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const ImageModal = ({ 
  open, 
  onClose, 
  images, 
  currentIndex, 
  shoeName 
}) => {
  if (!images || images.length === 0) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          background: 'rgba(30,30,30,0.98)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          borderRadius: 20,
        }
      }}
    >
      <div style={{ position: 'relative', padding: 0, background: 'transparent' }}>
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 12, color: '#fff', zIndex: 2 }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 350,
            minHeight: 350,
            padding: 32,
            background: 'transparent'
          }}
        >
          <img
            src={images[currentIndex]}
            alt={shoeName}
            style={{
              maxWidth: '60vw',
              maxHeight: '60vh',
              borderRadius: 16,
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
              background: '#fff',
              transition: 'opacity 0.5s'
            }}
          />
          <div style={{ marginTop: 18, color: '#fff', fontWeight: 600, fontSize: 18 }}>
            {shoeName} <span style={{ fontSize: 14, color: '#bbb' }}>({currentIndex + 1}/{images.length})</span>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ImageModal
