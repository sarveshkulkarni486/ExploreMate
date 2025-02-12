import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/payment';


export const savePayment = async(paymentDetails) => {
    console.log();
    try {
        const response = await axios.post(`${API_BASE_URL}/save-payment`, paymentDetails);
        return response;
    }catch(error) {
        console.log("Error", error);
    }
}