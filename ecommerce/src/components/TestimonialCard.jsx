import React from "react"

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card">
    <div className="testimonial-rating">
      {'⭐'.repeat(testimonial.rating)}
    </div>
    <p className="testimonial-comment">"{testimonial.comment}"</p>
    <div className="testimonial-author">
      <span className="author-avatar">{testimonial.avatar}</span>
      <span className="author-name">{testimonial.name}</span>
    </div>
  </div>
)

export default TestimonialCard
