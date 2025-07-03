import React from 'react'

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit, 
  placeholder = "Search products...",
  className = "search-bar"
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearchSubmit && onSearchSubmit(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="search-input-container" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.75rem 3rem 0.75rem 1rem',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '25px',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '0.5rem',
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
        >
          🔍
        </button>
      </div>
    </form>
  )
}

export default SearchBar
