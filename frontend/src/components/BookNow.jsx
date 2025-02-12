import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { createBooking } from "../services/booking";

const libraries = ["places"];
const googleMapsApiKey = "AIzaSyAqoP4raR5nH-XemKk4LVgs00nAnZhrOH0";

const BookNow = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate  = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const guideId = searchParams.get("guideId");
  const price_per_hr = parseFloat(searchParams.get("price_per_hr")); 
  const userId = localStorage.getItem("userId");
  


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });
  useEffect(() => {
    if (destinationCity) fetchTouristPlaces();
  }, [destinationCity]);

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setError(null);

        if (window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          const latLng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              setCurrentLocation(results[0].formatted_address);
            } else {
              setError("Could not fetch current location.");
            }
          });
        } else {
          setError("Google Maps API is not loaded yet.");
        }
      },
      (error) => {
        setError(
          error.code === error.PERMISSION_DENIED
            ? "Location access denied. Please enable GPS and try again."
            : "Error fetching location."
        );
      }
    );
  };

  const fetchTouristPlaces = useCallback(() => {
    if (!destinationCity || !map) return;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      query: `tourist attractions in ${destinationCity}`,
      fields: ["name", "geometry"],
    };

    service.textSearch(request, (results, status) => {
      if (status === "OK") {
        setTouristPlaces(results);
        setError(null);
      } else {
        setTouristPlaces([]);
        setError("No tourist places found.");
      }
    });
  }, [destinationCity, map]);

  const fetchRoute = useCallback(() => {
    if (!map || !currentLocation || !selectedPlace) {
      setError("Missing location data.");
      return;
    }

    setError(null);
    setDirections(null);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination: selectedPlace,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);
        } else {
          setError("Failed to fetch route.");
        }
      }
    );
  }, [map, currentLocation, selectedPlace]);

  
  const handleBooking = async() => {
    if(!userId || !guideId || !currentLocation || !selectedPlace || !distance){
      setError("Missing required fields");
      return;
    }

    const distancefloat = parseFloat(distance);
    
    const total = price_per_hr * distancefloat;
    const totalPrice = total.toString();

    const bookingData = {
      user_id: userId,
      guide_id: guideId,
      current_location: currentLocation,
      destination_location: selectedPlace,
      distance: distance,
      payment_status: "Pending",
      totalPrice: totalPrice,
    };
    console.log("Total Price:", totalPrice);  


    setLoading(true);
    try{
      console.log("booking data", bookingData);
      const response = await createBooking(bookingData);
      console.log("Booking successful", response);
      alert("Booking confirmed");
      navigate(`/payment?totalPrice=${totalPrice}`);
      
        
    }catch(error){
      setError("Failed to create booking");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setCurrentLocation("");
    setDestinationCity("");
    setSelectedPlace("");
    setDirections(null);
    setTouristPlaces([]);
    setDistance("");
    setDuration("");
    setError(null);
  };

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", width: "100vw", height: "100vh", marginTop:"4rem"}}>
        <div
          style={{
            width: "30%",
            padding: "20px",
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Find Your Route</h2>
          <button
            onClick={fetchCurrentLocation}
            style={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Current Location
          </button>
          <input
            type="text"
            placeholder="Current Location"
            name="currentLocation"
            value={currentLocation}
            disabled
            style={{ padding: "8px", marginBottom: "10px", backgroundColor: "#ddd" }}
          />
          <label>Destination City</label>
          <input
            type="text"
            placeholder="Enter City"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            required
            style={{ padding: "8px", marginBottom: "10px" }}
          />
          {touristPlaces.length > 0 && (
            <div>
              <label>Select a Tourist Place</label>
              <select name="selectedPlace"
                onChange={(e) => setSelectedPlace(e.target.value)}
                style={{ padding: "8px", marginBottom: "10px" }}
              >
                <option value="">-- Choose a Place --</option>
                {touristPlaces.map((place, index) => (
                  <option key={index} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={fetchRoute}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Show Route
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
          {distance && duration && (
            <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Duration:</strong> {duration}</p>
            </div>
          )}
            <button
              onClick={handleBooking}
              disabled={loading}
              style={{
                padding: "10px",
                backgroundColor: loading ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "10px",
              }}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          
        </div>
        <div style={{ width: "70%", height: "100%" }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 19.076, lng: 72.8777 }}
            zoom={10}
            onLoad={(map) => setMap(map)}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            {error && (
              <p
                style={{
                  color: "red",
                  position: "absolute",
                  top: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {error}
              </p>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
