import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../styles/GuideSection.css';
import Guideimage from '../assets/guide.jpg';
import { fetchGuides } from '../services/guideapi';  // Import fetch function
import { useSelector } from 'react-redux';  // To access authentication state
import { useNavigate } from 'react-router-dom';

function Guides() {
  const [guides, setGuides] = useState([]);  // State to hold guide data


  const navigate = useNavigate();
  // Access authentication state
  
  const {isAuthenticated, user} = useSelector((state)=> state.auth);

  const userId = localStorage.getItem("userId");

  // Fetch guide details on component mount
  useEffect(() => {
    const getGuides = async () => {
      try {
        const data = await fetchGuides();
        setGuides(data);  // Set the fetched guides to state
      } catch (error) {
        console.error("Error fetching guide data:", error);
      }
    };
    getGuides();
  }, []);

  const handleBooking = async (guideId, price_per_hr) => {
    if(!isAuthenticated){
      alert("Please log in to book a guide.");
      navigate("/login");
      return;
    }
    navigate(`/map?guideId=${guideId}&price_per_hr=${price_per_hr}`);
  };

  return (
    <div className="guide-section">
      <h2 style={{ textAlign: 'center' }}>Our Guides</h2>
      <div className="guide-cards">
        {guides.length > 0 ? (
          guides.map((guide, index) => (
            <div className="guide-card" key={index}>
              <img
                src={guide.profilepic ? `data:image/jpeg;base64,${guide.profilepic}` : Guideimage}  // Use default image if profilepic is not available
                alt={guide.name}
                className="guide-photo"
              />
              <h3>{guide.name}</h3>
              <p>Gender: {guide.gender}</p>
              <p>Price: {guide.price_per_hr}</p>
              <p>Expertise: {guide.expertise}</p>
              
              {/* Show "Book Now" button only if the user is authenticated */}
              {isAuthenticated && (
                <button className="book-now-button" onClick={()=> handleBooking(guide.id, guide.price_per_hr)}>Book Now</button>
              )}
            </div>
          ))
        ) : (
          <p>No guides available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Guides;
