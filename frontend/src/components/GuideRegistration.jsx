import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerGuide } from "../services/guideapi";
const GuideRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    language: "",
    price_per_hr: "",
    transportation: "",
    rating: "",
    notification_id: "",
    expertise: "",
    email: "",
    password: "",
    aadhaarnumber: "",
    profilepic: "",
    aadhaarpic: "",
    vehicletype: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.files[0]});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerGuide(formData);
      console.log("Registration successful", response.data);
      navigate("/guidelogin");

    }catch(error){
      console.error("Registration failed", error);
    }
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "80%", maxWidth: "800px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Guide Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Language</label>
            <input type="text" className="form-control" name="language" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Price Per Hour</label>
            <input type="number" step="0.01" className="form-control" name="price_per_hr" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Transportation</label>
            <input type="text" className="form-control" name="transportation" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input type="number" step="0.1" className="form-control" name="rating" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Expertise</label>
            <input type="text" className="form-control" name="expertise" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhaar Number</label>
            <input type="text" className="form-control" name="aadhaarnumber" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input type="file" className="form-control" name="profilepic" onChange={handleFileChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhaar Picture</label>
            <input type="file" className="form-control" name="aadhaarpic" onChange={handleFileChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Type</label>
            <input type="text" className="form-control" name="vehicletype" onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p>
        Already registered? <Link to="/guidelogin">Go to Login</Link>
      </p>
        </form>
      </div>
    </div>
  );
};

export default GuideRegistration;
