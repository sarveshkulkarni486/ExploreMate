import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginGuide } from "../services/guideapi";

const GuideLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const response = await loginGuide(formData.email, formData.password);
        console.log("login successfull");
    }catch(error) {
        console.error("Login failed", error);
    }
    // Handle the login logic here (e.g., verify credentials, navigate to dashboard)
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "80%", maxWidth: "400px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Guide Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p>
            Don't have an account? <Link to="/guideregister">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default GuideLogin;
