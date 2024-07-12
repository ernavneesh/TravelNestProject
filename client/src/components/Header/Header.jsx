import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { SessionContext } from '../../context/SessionContext';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const dropdownRef = useRef(null);
    const { userInfo, handleLogout } = useContext(SessionContext);

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

    const handleDestinationClick = async (destinationId) => {
        if (userInfo && userInfo.userId) {
            const userId = userInfo.userId;
            localStorage.setItem('userId', userId);
            localStorage.setItem('destinationId', destinationId);
            console.log('User ID:', userId);
            console.log('Destination ID:', destinationId);

            try {
                const response = await fetch('http://localhost:3000/api/userAnalysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, destinationId }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log('Post response:', result);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } else {
            console.log('User is not logged in.');
        }
    };

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
                                            <Link
                                                to={`/destinations/${destination._id}`}
                                                onClick={() => handleDestinationClick(destination._id)}
                                            >
                                                {destination.destinationName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li><a href="/about-us">About Us</a></li>
                        {userInfo && userInfo.firstName ? (
                            <>
                                <li style={{ fontSize: '1.18em' }}>Welcome, {userInfo.firstName}</li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="logout-button_loginPageStyle"
                                        style={{ fontSize: '1.18em' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login">Login/Register</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;