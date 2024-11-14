import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };


    return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
            <button className="hamburger-button" onClick={toggleMenu}>
                ☰
            </button>
            {isOpen && (
                <nav className="menu-items">
                    <button className="close-button" onClick={toggleMenu}>×</button>
                    <Link to="/" onClick={() => handleNavigation('/')}>Home</Link>
                    <Link to="/events" onClick={() => handleNavigation('/events')}>Event Management</Link>
                    <Link to="/volunteers" onClick={() => handleNavigation('/volunteers')}>Volunteer Tracking</Link>
                    {/* Add more links here for other features */}
                </nav>
            )}
        </div>
    );
};

export default HamburgerMenu;
