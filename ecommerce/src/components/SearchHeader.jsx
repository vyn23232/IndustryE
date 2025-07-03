import React from 'react'

const SearchHeader = ({ 
  searchQuery, 
  activeCategory, 
  categories, 
  shoesCount, 
  onClearSearch, 
  onCategoryChange 
}) => {
  return (
    <section className="shoes-header">
      <div className="container">
        <div className="header-content">
          <div className="page-title">
            <h1>
              {searchQuery ? (
                <>Search Results for "{searchQuery}"</>
              ) : (
                <>
                  {activeCategory === 'all' 
                    ? 'All Shoes' 
                    : categories.find(cat => cat.key === activeCategory)?.label || 'Shoes'
                  }
                </>
              )}
            </h1>
            <p className="results-count">
              {searchQuery 
                ? `${shoesCount} result${shoesCount !== 1 ? 's' : ''} found`
                : `${shoesCount} product${shoesCount !== 1 ? 's' : ''} available`
              }
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.key}
                className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Results Clear Button */}
          {searchQuery && (
            <div className="search-actions">
              <button 
                className="clear-search-btn"
                onClick={onClearSearch}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchHeader
