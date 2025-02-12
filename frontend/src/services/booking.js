import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/bookings';
export const createBooking = async (bookingData) => {
    console.log(bookingData);
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, bookingData);
        console.log(response);
        localStorage.setItem("bookingId", response.data.id);
        return response.data;
    }catch(error){
        console.error("Error creating booking:", error.response?.data || error);
        throw error;
    }
};

