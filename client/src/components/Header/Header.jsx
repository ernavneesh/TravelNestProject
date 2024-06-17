import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png'; // Adjust the path as per your file location

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [clickCounts, setClickCounts] = useState({
        vietnam: 0,
        laos: 0,
        cambodia: 0,
        thailand: 0
    });
    const dropdownRef = useRef(null);

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
        <header className="header"> {/* Updated className */}
            <div className="main-nav">
                <img src={logo} alt="Viland Travel Logo" className="logo" style={{ height: '80px' }} /> {/* Adjusted logo height */}
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
                        <li><a href="#login">Login/Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
