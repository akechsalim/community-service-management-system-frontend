import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
    // Get token and role from localStorage (or state if you store it there)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>

                {/* Show Event Management link for both Admin and Volunteer */}
                <li><Link to="/events">Event Management</Link></li>

                {/* Show Volunteer Tracking link only if the user is an admin */}
                {role === "ADMIN" && (
                    <li><Link to="/contributions">Volunteer Tracking</Link></li>
                )}

                {/* Show Admin Dashboard link only if the user is an admin */}
                {role === "ADMIN" && (
                    <li><Link to="/admin">Admin Dashboard</Link></li>
                )}

                {/* Show Volunteer Dashboard link only if the user is a volunteer */}
                {role === "VOLUNTEER" && (
                    <li><Link to="/volunteer">Volunteer Dashboard</Link></li>
                )}

                {/* Show Logout button only if the user is logged in */}
                {token && (
                    <li>
                        <button onClick={onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
