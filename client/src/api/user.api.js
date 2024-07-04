import axios from 'axios';

const API_URL = "http://localhost:3000/user/signup";

const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    registerUser
}