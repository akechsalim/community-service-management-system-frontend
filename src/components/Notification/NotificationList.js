// src/components/Notification/NotificationList.js
import React, { useState, useEffect } from 'react';
import { getNotifications } from '../../services/notificationService';  // Import the service

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Replace 'user' with the actual user or recipient identifier
        getNotifications('user')  // Example: Replace 'user' with dynamic user ID
            .then(response => {
                console.log('Notifications:', response.data); // Log the response to check the data
                setNotifications(response.data);  // Set the state with notifications data
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    }, []);  // Empty dependency array means this will run once when the component mounts

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications available</p>  // Display a message if no notifications
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <p>{notification.message}</p>
                            <p>Status: {notification.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;
