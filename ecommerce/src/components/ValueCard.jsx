import React from "react"

const ValueCard = ({ value }) => (
  <div className="value-card">
    <div className="value-icon">{value.icon}</div>
    <h3>{value.title}</h3>
    <p>{value.description}</p>
  </div>
)

export default ValueCard
