import React from 'react'
import '../style/team.css'
import louis from '../images/y.PNG'
import lee from '../images/a.PNG'
import poy from '../images/x.PNG'
import taws from '../images/z.PNG'

const About = () => {
  const teamMembers = [
    {
      name: 'Louis Angelo del Rosario',
      position: 'Computer Engineering',
      major: 'Intelligent Systems',
      image: louis,
    },
    {
      name: 'Eugene Christopher Lee',
      position: 'Computer Engineering',
      major: 'Systems Administration',
      image: lee,
    },
    {
      name: 'John Lloyd D. Ponce',
      position: 'Computer Engineering',
      major: 'Intelligent Systems',
      image: poy,
    },
    {
      name: 'Joshua Taway',
      position: 'Computer Engineering',
      major: 'Data Science',
      image: taws,
    }
  ];

  return (
    <div>
    <div className="team-section">
      <h2>Our Team</h2>
      <br></br>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <p>{member.major}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
    <h1>CACAOTECH is a system that can do fermentation and drying process of cacao beans. It is created to help small scale farmers in terms of production.</h1>
    </div>
  );
}

export default About