import React, {useEffect, useState} from "react";
import axios from "axios";
import './VolunteerTracking.css';


const VolunteerTracking = () => {
    const [contributions, setContributions] = useState([]);
    const [newContribution, setNewContribution] = useState({
        volunteerId: "",
        volunteerName: "",
        eventId: "",
        hours: "",
        description: "",
    });

    // Fetch all contributions
    const fetchContributions = () => {
        axios
            .get("http://localhost:8080/api/contributions")
            .then((response) => setContributions(response.data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchContributions();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewContribution({...newContribution, [name]: value});
    };

    // Handle adding a contribution
    const handleAddContribution = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/contributions", newContribution)
            .then(() => {
                fetchContributions();
                setNewContribution({volunteerId: "", volunteerName: "", eventId: "", hours: "", description: ""});
            })
            .catch((error) => console.error(error));
    };

    // Handle deleting a contribution
    const handleDeleteContribution = (id) => {
        axios
            .delete(`http://localhost:8080/api/contributions/${id}`)
            .then(() => fetchContributions())
            .catch((error) => console.error(error));
    };

    return (
        <div className="volunteer-tracking-container">
            <h1>Volunteer Tracking</h1>
            <div className="volunteer-card">
                <table className="contribution-table">
                    <thead>
                    <tr>
                        <th>Volunteer Name</th>
                        <th>Volunteer ID</th>
                        <th>Event ID</th>
                        <th>Hours</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contributions.length > 0 ? (
                        contributions.map((contribution) => (
                            <tr key={contribution.id}>
                                <td>{contribution.volunteerName}</td>
                                <td>{contribution.volunteerId}</td>
                                <td>{contribution.eventId}</td>
                                <td>{contribution.hours}</td>
                                <td>{contribution.description}</td>
                                <td>{new Date(contribution.createdAt).toLocaleString()}</td>
                                <td>
                                    <button className="delete-button"
                                            onClick={() => handleDeleteContribution(contribution.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No contributions found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <h2> Add Volunteer</h2>
            <form className="contribution-form" onSubmit={handleAddContribution}>
                <input
                    type="text"
                    name="volunteerId"
                    placeholder="Volunteer ID"
                    value={newContribution.volunteerId}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="volunteerName"
                    placeholder="Volunteer Name"
                    value={newContribution.volunteerName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="eventId"
                    placeholder="Event ID"
                    value={newContribution.eventId}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="hours"
                    placeholder="Hours"
                    step="0.1"
                    value={newContribution.hours}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newContribution.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Contribution</button>
            </form>
        </div>
    );
};

export default VolunteerTracking;
