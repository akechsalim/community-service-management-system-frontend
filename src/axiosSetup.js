import axios from 'axios';

// Set the base URL for all requests
axios.defaults.baseURL = 'http://localhost:8080';

// Set default headers for POST requests
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Intercept all requests to attach the JWT token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Replace with sessionStorage if needed
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error))

export default axios;
