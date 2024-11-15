import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MessageList = ({user}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/messages/${user}`)
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
    }, [user]);

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <strong>{message.sender}</strong>: {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
