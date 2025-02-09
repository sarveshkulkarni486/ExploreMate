import React, {useState} from 'react';
import bgImage from '../assets/background.jpg';
import '../styles/homepage.css';
import Footer from './Footer';
import Tours from './Tours';
import About from './About';
import Guides from './Guides';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bgImage} className="d-block w-100" alt="Background" />
          {/* Overlay Container */}
          <div className="overlay d-flex justify-content-center align-items-center vh-100">
            <div className="search-container">
              <div className="location">
                <label className="search-label">LOCATION</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="dates">
                <label className="search-label">DATE</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button className="explore-button" onClick={()=> navigate("/map")}>Explore Now</button>
            </div>
          </div>
        </div>
      </div>
      <About/>
      <Tours/>
      <Guides />
      
          <Footer/>
          
    </div>
  );
}

export default Home;
