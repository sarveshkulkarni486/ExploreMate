import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/bookings';
export const createBooking = async (user_id, guide_id, current_location, destination_location) => {
    console.log(user_id, guide_id, current_location, destination_location)
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, {
            user_id,
            guide_id,
            current_location,
            destination_location
        });
        return response.data;
    } catch (error) {
        console.error("Error creating booking: ", error);
        throw error.response ? error.response.data : error.message; // Proper error handling like registerUser
    }
};
export const updatePaymentStatus = async(bookingId, status) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/update-status/${bookindId}`, {status});
        return response.data;
    }catch(error) {
        console.error("Error updating payment status:", error);
        throw error;
    }
};