import axios from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance for history requests
const historyApi = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor to include token
historyApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function getHistory() {
    try {
        const response = await historyApi.get('/resumes');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch history");
    }
}