import axios from 'axios';

const guideapi = axios.create({
    baseURL: 'http://localhost:8080/guide',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginGuide = async(email, password)=> {
    try {
        const response = await guideapi.post('/login', {
            email: email,
            password: password
        });
        if(response.data && response.data.token){
            console.log("Token saved to localStorage", response.data.token);
            localStorage.setItem('token', response.data.token);
        }else {
            console.error("Token not recieved in response: ");
        }
        return response.data;
    }catch(error) {
        throw error.response ? error.response.data : error.message;
    }
};
export const registerGuide = async(formData) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("profilepic", formData.profilepic);
        formDataToSend.append("aadhaarpic", formData.aadhaarpic);

        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("language", formData.language);
        formDataToSend.append("price_per_hr", formData.price_per_hr);
        formDataToSend.append("transportation", formData.transportation);
        formDataToSend.append("rating", formData.rating);
        formDataToSend.append("expertise", formData.expertise);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("aadhaarnumber", formData.aadhaarnumber);
        formDataToSend.append("vehicletype", formData.vehicletype);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("role", "guide");
        
        const response = await guideapi.post('/register', formDataToSend, {
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : error.message;
    }
};

export const fetchGuides = async() => {
    try {
        const response= await guideapi.get('/getAllGuides');
        localStorage.setItem('guides', JSON.stringify(response));
        console.log(localStorage.getItem('guides'));
        return response.data;
    }catch(error) {
        throw error.response ? error.response.data : error.message;
    }
};

