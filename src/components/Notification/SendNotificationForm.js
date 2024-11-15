import React, {useState} from 'react';
import axios from 'axios';

const SendNotificationForm = () => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotification = {
            recipient: recipient,
            message: message
        };

        axios.post('http://localhost:8080/api/notifications', newNotification)
            .then(response => {
                console.log('Notification sent:', response.data);
                setRecipient('');
                setMessage('');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a notification"
                required
            />
            <button type="submit">Send Notification</button>
        </form>
    );
};

export default SendNotificationForm;
