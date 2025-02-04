import React from 'react'
import Footer from './Footer';
import '../styles/GuideSection.css';
import Guideimage from '../assets/guide.jpg';
function Guides() {
const guides = [
  {
    name: 'Guide1',
    gender: 'Male',
    photo: `${Guideimage}`,
    features: 'Friendly, Experienced',
    expertise: 'Adventure Tours',
  },
  {
    name: 'Guide2',
    gender: 'Male',
    photo: `${Guideimage}`,
    features: 'Knowledgeable, Professional',
    expertise: 'Cultural Tours',
  },
  {
    name: 'Guide3',
    gender: 'Male',
    photo: `${Guideimage}`,
    features: 'Enthusiastic, Local',
    expertise: 'Nature Tours',
  },
];
  return (
    <div className="guide-section">
      <h2 style={{textAlign: 'center'}}>Our Guides</h2>
      <div className="guide-cards">
        {guides.map((guide, index) => (
          <div className="guide-card" key={index}>
            <img src={guide.photo} alt={guide.name} className="guide-photo" />
            <h3>{guide.name}</h3>
            <p>Gender: {guide.gender}</p>
            <p>Features: {guide.features}</p>
            <p>Expertise: {guide.expertise}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Guides;
