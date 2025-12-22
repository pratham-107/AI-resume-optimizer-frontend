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
 * Upload resume and get analysis
 */
export async function uploadResume(formData) {
  try {
    // Token logging disabled in production

    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    // Upload error logging disabled in production
    throw new Error(error.response?.data?.message || "Failed to upload resume");
  }
}

/**
 * Get resume analysis by ID
 */
export async function getResumeAnalysis(id) {
  try {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Resume not found");
  }
}

/**
 * Get all resumes (history)
 */
export async function getAllResumes(page = 1, limit = 10) {
  try {
    const response = await api.get('/resumes', {
      params: {
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    // Fetch error logging disabled in production
    throw new Error(error.response?.data?.message || "Failed to fetch resumes");
  }
}
