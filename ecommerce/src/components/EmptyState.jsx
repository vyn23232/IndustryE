import React from 'react'

const EmptyState = ({ 
  searchQuery, 
  onClearSearch, 
  onBrowseAll,
  title,
  description,
  actionText = "Browse All Products"
}) => {
  if (searchQuery) {
    return (
      <div className="empty-state" style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🔍
        </div>
        <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
          No products found for "{searchQuery}"
        </h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Try searching for different keywords or browse our categories above.
        </p>
        <button 
          className="btn-primary"
          onClick={onClearSearch}
          style={{ 
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
        >
          {actionText}
        </button>
      </div>
    )
  }

  return (
    <div className="empty-state" style={{ textAlign: 'center', padding: '2rem' }}>
      <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        📦
      </div>
      <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
        {title || "No products available"}
      </h3>
      <p style={{ color: '#666' }}>
        {description || "Check back later for new arrivals."}
      </p>
    </div>
  )
}

export default EmptyState
