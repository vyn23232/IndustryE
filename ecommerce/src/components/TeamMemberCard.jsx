import React from "react"

const TeamMemberCard = ({ member }) => (
  <div className="team-card">
    <div className="team-avatar">{member.emoji}</div>
    <h3>{member.name}</h3>
    <p>{member.role}</p>
  </div>
)

export default TeamMemberCard
