import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Automatically fallback to local express server if running locally
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  return 'https://ai-cold-mail-generator-907c.onrender.com';
};

const API = axios.create({
  baseURL: getBaseURL().replace(/\/+$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    // Ensure the request goes to the backend when using a relative path
    if (config.url && config.url.startsWith('/api/') && !config.url.startsWith('http')) {
      config.url = `${config.baseURL}${config.url}`;
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
