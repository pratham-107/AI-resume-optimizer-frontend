import axios from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Generate cover letter for a resume
 */
export async function generateCoverLetter(resumeId, tone = "professional", length = "medium") {
    try {
        const response = await api.post(`/cover-letters/generate/${resumeId}`, {
            tone,
            length
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to generate cover letter");
    }
}

/**
 * Get cover letter by ID
 */
export async function getCoverLetter(id) {
    try {
        const response = await api.get(`/cover-letters/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Cover letter not found");
    }
}

/**
 * Get all cover letters
 */
export async function getAllCoverLetters(page = 1, limit = 10) {
    try {
        const response = await api.get('/cover-letters', {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch cover letters");
    }
}

/**
 * Delete cover letter
 */
export async function deleteCoverLetter(id) {
    try {
        const response = await api.delete(`/cover-letters/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete cover letter");
    }
}