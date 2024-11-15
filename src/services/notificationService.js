import axios from 'axios';

// Function to fetch notifications from the backend
export const getNotifications = (userId) => {
    // Adjust the API endpoint based on your backend
    return axios.get(`/api/notifications?userId=${userId}`);
};