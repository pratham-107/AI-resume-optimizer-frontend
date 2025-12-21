import axios from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance for auth requests
const authApi = axios.create({
    baseURL: API_BASE_URL,
});

//SIGNUP
export async function signup(data) {
    try {
        const response = await authApi.post('/auth/signup', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Signup Failed");
    }
}

//LOGIN
export async function login(data) {
    try {
        const response = await authApi.post('/auth/login', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Store tokens in sessionStorage instead of localStorage
        // This ensures user has to login again when tab is closed
        if (response.data.token) {
            sessionStorage.setItem("token", response.data.token);
        }
        if (response.data.user) {
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login Failed");
    }
}

//LOGOUT USER
export function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
}