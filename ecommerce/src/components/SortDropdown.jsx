import React from 'react'

const SortDropdown = ({ 
  sortOptions, 
  currentSort, 
  onSortChange 
}) => {
  const defaultSortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'rating-desc', label: 'Rating (High to Low)' },
    { value: 'newest', label: 'Newest First' }
  ]

  const options = sortOptions || defaultSortOptions

  return (
    <div className="sort-dropdown" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <label style={{ 
        color: '#b3b3b3', 
        fontSize: '0.9rem',
        whiteSpace: 'nowrap'
      }}>
        Sort by:
      </label>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '6px',
          padding: '0.5rem',
          fontSize: '0.9rem',
          outline: 'none',
          cursor: 'pointer',
          minWidth: '150px'
        }}
      >
        {options.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            style={{
              background: '#2d2d2d',
              color: '#fff'
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortDropdown
