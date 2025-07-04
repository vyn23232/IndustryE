import React from 'react'

const NavigationArrows = ({ 
  currentIndex, 
  totalItems, 
  itemsPerPage = 4, 
  onScrollLeft, 
  onScrollRight 
}) => {
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex + itemsPerPage < totalItems

  return (
    <div className="nav-arrows">
      <button 
        className={`arrow-btn ${!canScrollLeft ? 'disabled' : ''}`}
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
      >
        ←
      </button>
      <button 
        className={`arrow-btn ${!canScrollRight ? 'disabled' : ''}`}
        onClick={onScrollRight}
        disabled={!canScrollRight}
      >
        →
      </button>
    </div>
  )
}

export default NavigationArrows
