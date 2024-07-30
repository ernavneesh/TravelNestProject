import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import registrationImage from '../../assets/images/Registration.png'; // Adjust the path to your image
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{10}$/; // Regular expression for 10-digit contact number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password regex

        if (!formData.firstName) {
            tempErrors.firstName = "First Name is required.";
        }

        if (!formData.lastName) {
            tempErrors.lastName = "Last Name is required.";
        }

        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        } else if (!passwordRegex.test(formData.password)) {
            tempErrors.password = "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Confirm Password is required.";
        }

        if (!formData.contact) {
            tempErrors.contact = "Contact is required.";
        } else if (!contactRegex.test(formData.contact)) {
            tempErrors.contact = "Contact must be a 10-digit number.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:3000/api/users/register', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response);
                setMessage('User Registration successful!');
                setShowPopup(true); // Show pop-up message
                setTimeout(() => {
                    setShowPopup(false); // Hide pop-up message after 3 seconds
                    navigate('/login'); // Redirect to login page
                }, 3000);
            } catch (error) {
                console.error("Error response:", error.response);
                if (error.response && error.response.status === 400) {
                    if (error.response.data && error.response.data.error === 'Email already in use') {
                        setMessage('Email already in use');
                    } else {
                        setMessage(error.response.data.error || 'Email already in use.');
                    }
                } else {
                    setMessage('Network error, please try again.');
                }
                setShowPopup(true); // Show error pop-up message
                setTimeout(() => {
                    setShowPopup(false); // Hide error pop-up message after 3 seconds
                }, 3000);
            }
        }
    };

    return (
        <div className="registration-container">
            <div className="image-container">
                <img src={registrationImage} alt="Registration" />
            </div>
            <div className="form-container">
                <h2>Registration Form</h2>
                {showPopup && (
                    <div className="popup">
                        <p>{message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <i 
                                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`} 
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <i 
                                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`} 
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <span className="error">{errors.contact}</span>}
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <a className="login-link" onClick={() => navigate('/login')} > Go Back to Login</a>
            </div>
        </div>
    );
};

export default Registration;
