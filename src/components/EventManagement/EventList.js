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
                        <h4>Tasks</h4>
                        <ul>
                            {event.tasks && event.tasks.map((task) => (
                                <li key={task.id}>{task.name}</li>
                            ))}
                        </ul>
                        <h4>Volunteers</h4>
                        <ul>
                            {event.volunteers && event.volunteers.map((volunteer) => (
                                <li key={volunteer.id}>{volunteer.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
