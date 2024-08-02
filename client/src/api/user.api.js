import axios from 'axios';
axios.defaults.withCredentials = true;

const REGISTER_API_URL = "http://localhost:3000/user/signup";
const LOGIN_API_URL = "http://localhost:3000/user/signin";
const FORGOT_PASSWORD_API_URL = "http://localhost:3000/user/forgot-password";
const RESET_PASSWORD_API_URL = "http://localhost:3000/user/reset-password";
const VERIFY_USER_API_URL = "http://localhost:3000/user/verify-user";
const LOGOUT_URL = "http://localhost:3000/user/logout"
const GEMIN_API_URL = "http://localhost:3000/user/chat";

const registerUser = async (userData) => {
    try {
        const response = await axios.post(REGISTER_API_URL, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong on the server! Please try again later");
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong on the server! Please try again later");
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong on the server! Please try again later");
        }
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
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong on the server! Please try again later");
        }
    }
}

const verifyUser = async () => {
    try {
        const response = await axios.get(VERIFY_USER_API_URL);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Something went wrong on the server! Please try again later");
        }
    }
}


const logoutUser = async () => {
    try {
        const response = await axios.get(LOGOUT_URL);
        return response.data;
    } catch (error) {
        throw new Error("Something went wrong on the server! Please try again later");
    }
}

const GeminApi = async (input) => {
    try {
        const response = await axios.post(GEMIN_API_URL, { input })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    GeminApi,
    logoutUser,
    verifyUser
}