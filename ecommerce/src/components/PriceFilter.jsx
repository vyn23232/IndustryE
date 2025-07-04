import React from 'react'

const PriceFilter = ({ 
  minPrice, 
  maxPrice, 
  currentMin, 
  currentMax, 
  onPriceChange 
}) => {
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value)
    onPriceChange(value, currentMax)
  }

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value)
    onPriceChange(currentMin, value)
  }

  return (
    <div className="price-filter" style={{
      background: 'rgba(255,255,255,0.05)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h4 style={{ 
        color: '#fff', 
        marginBottom: '1rem',
        fontSize: '1.1rem',
        fontWeight: 600
      }}>
        Price Range
      </h4>
      
      <div className="price-inputs" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div className="price-input-group">
          <label style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>Min</label>
          <input
            type="number"
            value={currentMin}
            onChange={handleMinChange}
            min={minPrice}
            max={maxPrice}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          />
        </div>
        
        <div className="price-input-group">
          <label style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>Max</label>
          <input
            type="number"
            value={currentMax}
            onChange={handleMaxChange}
            min={minPrice}
            max={maxPrice}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          />
        </div>
      </div>
      
      <div className="price-display" style={{
        textAlign: 'center',
        color: '#ff6b35',
        fontSize: '0.9rem',
        fontWeight: 600
      }}>
        ₱{currentMin.toLocaleString()} - ₱{currentMax.toLocaleString()}
      </div>
    </div>
  )
}

export default PriceFilter
