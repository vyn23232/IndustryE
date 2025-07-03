import React from 'react'

const PaginationDots = ({ totalItems, itemsPerPage, currentIndex, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  if (totalPages <= 1) return null

  return (
    <div className="products-pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`pagination-dot ${currentIndex === index * itemsPerPage ? 'active' : ''}`}
          onClick={() => onPageChange(index * itemsPerPage)}
        />
      ))}
    </div>
  )
}

export default PaginationDots
