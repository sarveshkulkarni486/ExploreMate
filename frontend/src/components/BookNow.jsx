import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "AIzaSyBOjLQjq7Ep6ELWC94_abeTjBgVQoCgL3A"; // Replace with your actual API key

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = { lat: 20, lng: 78 };

const BookNow = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [marker, setMarker] = useState(null);

  const handleFindLocation = () => {
    if (!currentLocation) return;
    setMarker({ lat: center.lat + Math.random(), lng: center.lng + Math.random() }); // Dummy marker update
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Side: Form */}
      <div className="col-md-4 p-4 bg-light">
        <h4>Find Route</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Current Location"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleFindLocation}>
          Find Location
        </button>
      </div>

      {/* Right Side: Map */}
      <div className="col-md-8">
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default BookNow;
