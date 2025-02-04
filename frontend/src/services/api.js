import axios from "axios";
import useNavigate from 'react-router-dom';
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type':'application/json',
    },
});
export const loginUser = async(email, password)=>{
    try{
        const response = await api.post('/auth/login', {email, password});
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }
};
export const registerUser = async (fullname, email, password)=>{
    try{
        const response = await api.post('/auth/register', {fullname, email, password});
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }
};

export const forgotPassword = async(email) => {
    try{
        const response = await api.post('/auth/forgot-password', email);
        return response.data;
    }
    catch(error){
        throw error.response ? error.response.data : error.message;
    }
};