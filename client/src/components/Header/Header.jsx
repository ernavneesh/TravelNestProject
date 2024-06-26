import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { SessionContext } from '../../context/SessionContext';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [clickCounts, setClickCounts] = useState({
        vietnam: 0,
        laos: 0,
        cambodia: 0,
        thailand: 0
    });
    const dropdownRef = useRef(null);
    const { username, handleLogout } = useContext(SessionContext);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const handleDropdownItemClick = (item) => {
        setClickCounts(prevCounts => ({
            ...prevCounts,
            [item]: prevCounts[item] + 1
        }));
        console.log(`Clicked on ${item}. Count: ${clickCounts[item] + 1}`);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="main-nav">
                <img src={logo} alt="Viland Travel Logo" className="logo" style={{ height: '80px' }} />
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li className="dropdown" ref={dropdownRef}>
                            <a href="#destination" onClick={handleDropdownToggle}>
                                Destinations
                            </a>
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li><a href="#vietnam" onClick={() => handleDropdownItemClick('vietnam')}>
                                        Vietnam
                                    </a></li>
                                    <li><a href="#laos" onClick={() => handleDropdownItemClick('laos')}>
                                        Laos
                                    </a></li>
                                    <li><a href="#cambodia" onClick={() => handleDropdownItemClick('cambodia')}>
                                        Cambodia
                                    </a></li>
                                    <li><a href="#thailand" onClick={() => handleDropdownItemClick('thailand')}>
                                        Thailand
                                    </a></li>
                                </ul>
                            )}
                        </li>
                        <li><a href="#about">About Us</a></li>
                        {username ? (
                            <>
                                <li>Welcome, {username}</li>
                                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
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
