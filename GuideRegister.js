import React, { useState } from 'react';
import './GuideRegister.css';  // Optional CSS for styling

const GuideRegister = () => {
  const [guideName, setGuideName] = useState('');
  const [guideExpertise, setGuideExpertise] = useState('');
  const [guideEmail, setGuideEmail] = useState('');
  const [guidePassword, setGuidePassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [aadhaarPic, setAadhaarPic] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [permanentAddress, setPermanentAddress] = useState('');
  const [error, setError] = useState('');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guideName && guideExpertise && guideEmail && guidePassword && aadhaarNumber && phoneNumber && permanentAddress) {
      alert("Guide Registered Successfully!");
    } else {
      setError('Please fill out all fields!');
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Display image preview (optional)
    }
  };

  const handleAadhaarPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarPic(URL.createObjectURL(file)); // Display Aadhaar pic preview (optional)
    }
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setLanguagesKnown(selectedLanguages);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageSelect = (language) => {
    setLanguagesKnown(prevLanguages => 
      prevLanguages.includes(language) ? prevLanguages.filter(l => l !== language) : [...prevLanguages, language]
    );
  };

  return (
    <div className="guide-register">
      <h2>Register as a Guide</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Guide Name</label>
          <input
            type="text"
            value={guideName}
            onChange={(e) => setGuideName(e.target.value)}
            placeholder="Enter guide name"
            required
          />
        </div>
        <div className="form-group">
          <label>Expertise</label>
          <input
            type="text"
            value={guideExpertise}
            onChange={(e) => setGuideExpertise(e.target.value)}
            placeholder="Enter your expertise"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={guideEmail}
            onChange={(e) => setGuideEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={guidePassword}
            onChange={(e) => setGuidePassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            placeholder="Enter Aadhaar number"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            onChange={handleProfilePicChange}
            accept="image/*"
            required
          />
          {profilePic && <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />}
        </div>
        <div className="form-group">
          <label>Aadhaar Card Picture</label>
          <input
            type="file"
            onChange={handleAadhaarPicChange}
            accept="image/*"
            required
          />
          {aadhaarPic && <img src={aadhaarPic} alt="Aadhaar Preview" className="aadhaar-pic-preview" />}
        </div>
        <div className="form-group">
          <label>Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="">Select vehicle type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Bus">Bus</option>
            <option value="Bicycle">Bicycle</option>
          </select>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Languages Known</label>
          <div className="dropdown-container">
            <button type="button" className="dropdown-button" onClick={toggleLanguageDropdown}>
              {languagesKnown.length === 0 ? "Select Languages" : languagesKnown.join(", ")}
            </button>
            {isLanguageDropdownOpen && (
              <div className="dropdown-list">
                {["English", "Hindi", "Spanish", "French", "German", "Italian", "Chinese", "Other"].map((language) => (
                  <label key={language} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={language}
                      checked={languagesKnown.includes(language)}
                      onChange={() => handleLanguageSelect(language)}
                    />
                    {language}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Permanent Address</label>
          <textarea
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            placeholder="Enter your permanent address"
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default GuideRegister;
