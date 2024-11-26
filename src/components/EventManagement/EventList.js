import React, {useEffect, useState} from "react";
import axios from "axios";
import './EventList.css'

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [updatedEvent, setUpdatedEvent] = useState({
        name: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
    });
    const [newEvent, setNewEvent] = useState({
        name: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
    });

    const fetchEvents = () => {
        axios.get("http://localhost:8080/api/events")
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle input changes for editing events
    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setUpdatedEvent((prev) => ({...prev, [name]: value}));
    };

    const handleEditClick = (event) => {
        setEditingEvent(event);
        setUpdatedEvent({
            ...event,
            startTime: event.startTime.split(".")[0], // Ensures datetime-local format
            endTime: event.endTime.split(".")[0],
        });
    };

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8080/api/events/${editingEvent.id}`, updatedEvent)
            .then((response) => {
                alert("Event updated successfully!");
                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.id === editingEvent.id ? response.data : event
                    )
                );
                setEditingEvent(null);
                setSuccessMessage("Event updated successfully!"); // Set success message
                setTimeout(() => setSuccessMessage(""), 3000);// Exit editing mode
            })
            .catch((error) => console.error("Error updating event:", error));
    };

    // Handle new event input changes
    // const handleNewInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setNewEvent((prev) => ({...prev, [name]: value}));
    // };

// Open event details
    const handleShowDetails = (event) => {
        setSelectedEvent(event); // Set the selected event for modal
    };

// Close event details
    const handleCloseDetails = () => {
        setSelectedEvent(null);
    };

    // Handle input change in the form
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewEvent((prev) => ({...prev, [name]: value}));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/events", newEvent)
            .then(() => {
                fetchEvents(); // Refresh event list after adding
                setNewEvent({name: "", description: "", location: "", startTime: "", endTime: ""});
                setSuccessMessage("Event created successfully!"); // Set success message
                setTimeout(() => setSuccessMessage(""), 3000);// Clear form
            })
            .catch((error) => console.error(error));
    };

    // Handle delete event
    const handleDelete = (eventId) => {
        axios
            .delete(`http://localhost:8080/api/events/${eventId}`)
            .then(() => {
                fetchEvents(); // Refresh the event list after deleting
            })
            .catch((error) => console.error("Error deleting event:", error));
    };

    return (
        <div className="event-list-container">
            <h1>Community Events</h1>
            <div className="event-cards">
                {successMessage && (<div className="success-message">{successMessage}</div>)}

                {events && events.length > 0 ? (events.map(event => (
                    <div key={event.id} className="event-card">
                        <h2>{event.name}</h2>
                        <p className="description">{event.description}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p>
                            <strong>Time:</strong> {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                        </p>
                        <div className="event-actions">
                            <button className="details-button" onClick={() => handleShowDetails(event)}>Get Details
                            </button>
                            <button className="edit-button" onClick={() => handleEditClick(event)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    </div>
                ))) : (
                    <p>No events available.</p>
                )}
            </div>
            {/* Edit Event Form */}
            {editingEvent && (
                <div className={`edit-modal ${editingEvent ? 'open' : ''}`}>
                    <div className="modal-content">
                        <h2>Edit Event</h2>
                        <form onSubmit={handleUpdateEvent}>
                            <input
                                type="text"
                                name="name"
                                value={updatedEvent.name}
                                onChange={handleEditChange}
                                placeholder="Event Name"
                                required
                            />
                            <textarea
                                name="description"
                                value={updatedEvent.description}
                                onChange={handleEditChange}
                                placeholder="Event Description"
                                required
                            ></textarea>
                            <input
                                type="text"
                                name="location"
                                value={updatedEvent.location}
                                onChange={handleEditChange}
                                placeholder="Event Location"
                                required
                            />
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={updatedEvent.startTime}
                                onChange={handleEditChange}
                                required
                            />
                            <input
                                type="datetime-local"
                                name="endTime"
                                value={updatedEvent.endTime}
                                onChange={handleEditChange}
                                required
                            />
                            <button type="submit">Update Event</button>
                            <button type="button" onClick={() => setEditingEvent(null)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for showing event details */}
            {selectedEvent && (
                <div className="event-modal">
                    <div className="modal-content">
                        <h2>{selectedEvent.name}</h2>
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>Location:</strong> {selectedEvent.location}</p>
                        <p>
                            <strong>Time:</strong> {new Date(selectedEvent.startTime).toLocaleString()} - {new Date(selectedEvent.endTime).toLocaleString()}
                        </p>
                        <button onClick={handleCloseDetails}>Close</button>
                    </div>
                </div>
            )}
            <div className="new-event-form">
                <h2>Create New Event</h2>
                <form className="event-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={newEvent.name}
                        onChange={handleInputChange}
                        placeholder="Event Name"
                        required
                    />
                    <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        placeholder="Event Description"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="location"
                        value={newEvent.location}
                        onChange={handleInputChange}
                        placeholder="Event Location"
                        required
                    />
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={newEvent.endTime}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default EventList;