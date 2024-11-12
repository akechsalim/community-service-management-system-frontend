import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get('/events')
            .then((response) => setEvents(response.data))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className="event-list-container">
            <h1>Community Service Events</h1>
            <ul id="event-items">
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
