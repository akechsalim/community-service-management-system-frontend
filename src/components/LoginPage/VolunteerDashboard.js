import React, { useEffect, useState } from "react";
import axios from "axios";

const VolunteerDashboard = ({ token, onLogout }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/volunteer/events", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(response.data);
            } catch (err) {
                console.error("Failed to fetch events", err);
            }
        };
        fetchEvents();
    }, [token]);

    return (
        <div>
            <h1>Volunteer Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
            <div>
                <h2>Events:</h2>
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
