import React, {useState} from 'react';
import axios from 'axios';

const SendMessageForm = ({sender, receiver}) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: sender,
            receiver: receiver,
            content: message
        };

        axios.post('http://localhost:8080/api/messages', newMessage)
            .then(response => {
                console.log('Message sent:', response.data);
                setMessage('');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message"
                required
            />
            <button type="submit">Send Message</button>
        </form>
    );
};

export default SendMessageForm;
