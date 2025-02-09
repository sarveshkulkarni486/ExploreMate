// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';

const GuideProfile = () => {
  // Mocking the guide's details, ideally fetched from an API or context
  const [guide, setGuide] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Guide',
    phone: '123-456-7890',
    address: '123 Main St, Hometown, Country',
  });

  useEffect(() => {
    // Here you could fetch the guide's data from an API
    // Example:
    // fetch('api/guide')
    //   .then(response => response.json())
    //   .then(data => setGuide(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile Details</h2>
      <div>
        <strong>Name:</strong> {guide.name}
      </div>
      <div>
        <strong>Email:</strong> {guide.email}
      </div>
      <div>
        <strong>Role:</strong> {guide.role}
      </div>
      <div>
        <strong>Phone:</strong> {guide.phone}
      </div>
      <div>
        <strong>Address:</strong> {guide.address}
      </div>
    </div>
  );
};

export default GuideProfile;
