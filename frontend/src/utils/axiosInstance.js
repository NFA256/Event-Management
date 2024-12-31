// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Correct way to access environment variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token in Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or context
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle global errors (e.g. token expiry)
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g. clear token, redirect to login)
      localStorage.removeItem('authToken');
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;
