import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const dropdownRef = useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/destination');
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <header className="header">
            <div className="main-nav">
                <img src={logo} alt="Viland Travel Logo" className="logo" />
                <button className="menu-toggle" onClick={handleMenuToggle}>
                    ☰
                </button>
                <nav className={menuOpen ? 'open' : ''}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li className="dropdown" ref={dropdownRef}>
                            <a href="#destination" onClick={handleDropdownToggle}>
                                Destinations
                            </a>
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    {destinations.map(destination => (
                                        <li key={destination._id}>
                                        <Link to={`/destinations/${destination._id}`}>
                                            {destination.destinationName}
                                        </Link>
                                    </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/login">Login/Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
