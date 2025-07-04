import React from "react"

const FeatureCard = ({ feature }) => (
  <div className="feature-card">
    <div className="feature-icon">{feature.icon}</div>
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </div>
)

export default FeatureCard
