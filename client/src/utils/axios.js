import axios from 'axios';

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'https://ai-cold-mail-generator-907c.onrender.com').replace(/\/+$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.baseURL + config.url);
    // Ensure the request goes to the backend when using a relative path
    if (config.url && config.url.startsWith('/api/')) {
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
