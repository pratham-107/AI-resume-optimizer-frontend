// API service for AI Resume Optimizer

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Upload resume and get analysis
 * @param {FormData} formData - Form data containing resume file and job description
 * @returns {Promise<Object>} Analysis results
 */
export async function uploadResume(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload resume');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
 * Get resume analysis by ID
 * @param {string} id - Resume ID
 * @returns {Promise<Object>} Resume analysis data
 */
export async function getResumeAnalysis(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes/${id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch resume analysis');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * Get all resumes (paginated)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 10)
 * @returns {Promise<Object>} Paginated resumes data
 */
export async function getAllResumes(page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/resumes?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch resumes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}