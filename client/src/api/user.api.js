import axios from 'axios';

const REGISTER_API_URL = "http://localhost:3000/user/signup";
const LOGIN_API_URL = "http://localhost:3000/user/signin";
const FORGOT_PASSWORD_API_URL = "http://localhost:3000/user/forgot-password";
axios.defaults.withCredentials = true;

const registerUser = async (userData) => {
    try {
        const response = await axios.post(REGISTER_API_URL, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const loginUser = async (userData) => {
    try {
        const response = await axios.post(LOGIN_API_URL, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(FORGOT_PASSWORD_API_URL, userData, {
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
    registerUser,
    loginUser,
    forgotPassword
}