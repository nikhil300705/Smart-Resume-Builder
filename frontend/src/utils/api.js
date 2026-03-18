import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

export const resumeAPI = {
  getResumes: () => api.get('/resume'),
  getResume: (id) => api.get(`/resume/${id}`),
  createResume: (resumeData) => api.post('/resume', resumeData),
  updateResume: (id, resumeData) => api.put(`/resume/${id}`, resumeData),
  deleteResume: (id) => api.delete(`/resume/${id}`),
  duplicateResume: (id) => api.post(`/resume/${id}/duplicate`),
};

export const aiAPI = {
  generateSummary: (resumeData) => api.post('/ai/generate-summary', resumeData),
  improveBulletPoints: (bulletPoints) => api.post('/ai/improve-bullets', { bulletPoints }),
  suggestSkills: (jobTitle, experience) => api.post('/ai/suggest-skills', { jobTitle, experience }),
  optimizeForJob: (resumeData, jobDescription) => api.post('/ai/optimize-resume', { resumeData, jobDescription }),
  generateCoverLetter: (resumeData, jobDescription) => api.post('/ai/generate-cover-letter', { resumeData, jobDescription }),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
};

export const uploadFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export default api;