import React from "react"

const TeamMemberCard = ({ member }) => (
  <div className="team-card">
    <div className="team-avatar">
      {member.image ? (
        <img 
          src={member.image} 
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
      ) : (
        member.emoji
      )}
    </div>
    <h3>{member.name}</h3>
    <p>{member.role}</p>
  </div>
)

export default TeamMemberCard
