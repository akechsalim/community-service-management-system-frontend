import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './VolunteerList.css';

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    useEffect(() => {
        api.get('/volunteers')
            .then((response) => {
                console.log("Volunteers data:", response.data);
                setVolunteers(response.data);
            })
            .catch((error) => console.error("Error fetching volunteers:", error));
    }, []);

    const handleAddVolunteer = () => {
        const newVolunteer = {name, role, contactInfo};
        api.post('/volunteers', newVolunteer)
            .then((response) => {
                setVolunteers([...volunteers, response.data]);
                setName('');
                setRole('');
                setContactInfo('');
            })
            .catch((error) => console.error("Error adding volunteer:", error));
    };

    return (
        <div className="volunteer-list-container">
            <h1>Volunteer Tracking</h1>
            <ul id="volunteer-items">
                {volunteers.map((volunteer) => (
                    <li key={volunteer.id}>
                        <h3>{volunteer.name}</h3>
                        <p>Role: {volunteer.role}</p>
                        <p>Contact: {volunteer.contactInfo}</p>
                    </li>
                ))}
            </ul>

            <div className="add-volunteer-form">
                <h2>Add Volunteer</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Info"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                />
                <button onClick={handleAddVolunteer}>Add Volunteer</button>
            </div>
        </div>
    );
};

export default VolunteerList;
