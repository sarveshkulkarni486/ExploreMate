import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { savePayment } from "../services/payment";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = searchParams.get("totalPrice");


  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [userName, setUserName] = useState(""); // User's name from localStorage
  const [userId, setUserId] = useState(""); // User's id from localStorage
  const storedBookingId = localStorage.getItem('bookingId');
  const storedUserName = localStorage.getItem('name');
  const storedUserId = localStorage.getItem('userId');
  const storedGuideId = localStorage.getItem('id');

  console.log(storedBookingId);


  // Fetch user data from localStorage
  React.useEffect(() => {
   



    if (storedUserName && storedUserId) {
      setUserName(storedUserName);
      setUserId(storedUserId);
    }
  }, []);

  const handlePayment = async () => {
    // Create the payment details object
    try{
      const amount = totalPrice ? parseFloat(totalPrice) : null;

      const paymentDetails = {
        storedGuideId,
        storedBookingId,
        userId,
        userName,
        cardNumber,
        expiry,
        cvv,
        amount,
      };
      const savepaymentStatus = await savePayment(paymentDetails);
      alert("Payment successful");
      navigate("/")
      console.log("Payment Response", savepaymentStatus);
    }catch(error) {
      alert("Payment failed")
    }
    };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0C4160",
      }}
    >
      <div
        style={{
          width: "500px",
          color: "black",
          borderRadius: "20px",
          background: "white",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "30px", fontWeight: "800", textAlign: "center" }}>
          Payment Details
        </p>
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "14px", fontWeight: "600" }}>Person Name</p>
          <input
            type="text"
            value={userName || "Name"}
            disabled
            style={{
              width: "100%",
              height: "60px",
              paddingLeft: "20px",
              backgroundColor: "#223C60",
              border: "2px solid transparent",
              color: "white",
              marginBottom: "15px",
            }}
          />
          <p style={{ fontSize: "14px", fontWeight: "600" }}>Card Number</p>
          <input
            type="text"
            placeholder="1234 5678 435678"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{
              width: "100%",
              height: "60px",
              paddingLeft: "20px",
              backgroundColor: "#223C60",
              border: "2px solid transparent",
              color: "white",
              marginBottom: "15px",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <p style={{ fontSize: "14px", fontWeight: "600" }}>Expiry</p>
              <input
                type="text"
                placeholder="MM/YYYY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                style={{
                  width: "100%",
                  height: "60px",
                  paddingLeft: "20px",
                  backgroundColor: "#223C60",
                  border: "2px solid transparent",
                  color: "white",
                  marginBottom: "15px",
                }}
              />
            </div>
            <div style={{ width: "48%" }}>
              <p style={{ fontSize: "14px", fontWeight: "600" }}>CVV/CVC</p>
              <input
                type="password"
                placeholder="***"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{
                  width: "100%",
                  height: "60px",
                  paddingLeft: "20px",
                  backgroundColor: "#223C60",
                  border: "2px solid transparent",
                  color: "white",
                  marginBottom: "15px",
                }}
              />
            </div>
          </div>
          <button
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                "linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)",
              border: "none",
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.5s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundPosition = "right center")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundPosition = "left center")
            }
            onClick={handlePayment}
          >
            Pay ₹{totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
