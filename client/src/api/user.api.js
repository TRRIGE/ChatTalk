import axios from 'axios';

const REGISTER_API_URL = "http://localhost:3000/user/signup";
const LOGIN_API_URL = "http://localhost:3000/user/signin";
const FORGOT_PASSWORD_API_URL = "http://localhost:3000/user/forgot-password";
const RESET_PASSWORD_API_URL = "http://localhost:3000/user/reset-password";
// const VERIFY_USER_API_URL = "http://localhost:3000/user/verify-user";
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

const resetPassword = async (userData) => {
    try {
        const response = await axios.post(RESET_PASSWORD_API_URL, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// const verifyUser = async () => {
//     try {
//         await axios.get(VERIFY_USER_API_URL)
//         return { status: true };
//     } catch (error) {
//         throw new Error(error);
//     }
// }

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    // verifyUser
}