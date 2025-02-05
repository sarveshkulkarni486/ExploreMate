import axios from "axios";
import { useNavigate } from "react-router-dom";
const api = axios.create({
    baseURL: 'http://localhost:8080/auth',
    timeout: 10000,
    headers: {
        'Content-Type':'application/json',
    },
});
export const loginUser = async(emailId, password)=>{
    try{
        const response = await api.post('/login', {
            emailId: emailId,
            password: password
        });
        //jwt token is send by server as response
        if(response.data && response.data.token){
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }
};
export const registerUser = async (name, emailId, password)=>{
    try{
        const response = await api.post('/register', {
            name: name, 
            emailId: emailId, 
            password: password,
            role: "USER"
        });
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

export const getUserProfile = async()=>{
    try {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error("No auhtentication token found");
        }
        const response = await api.get('/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`, //attach the jwt token
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }
}