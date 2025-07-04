import React from "react"

const CategoryCard = ({ category, onClick }) => (
  <div className="category-card" style={{'--accent-color': category.color}}>
    <div className="category-icon">{category.icon}</div>
    <h3 className="category-name">{category.name}</h3>
    <button 
      className="category-btn"
      onClick={() => onClick(category.id)}
    >
      Explore
    </button>
    <div className="wishlist-btn">♡</div>
  </div>
)

export default CategoryCard
