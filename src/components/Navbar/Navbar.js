import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Event Management</Link></li>
                <li><Link to="/contributions">Volunteer Tracking</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;
