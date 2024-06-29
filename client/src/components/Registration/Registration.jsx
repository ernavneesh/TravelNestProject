import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import registrationImage from '../../assets/images/image.png'; // Adjust the path to your image

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

    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        }

        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Confirm Password is required.";
        }

        if (!formData.contact) {
            tempErrors.contact = "Contact is required.";
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
                setMessage('Registration successful!');
                navigate('/login'); // Redirect to login page
            } catch (error) {
                console.error("Error response:", error.response);
                if (error.response && error.response.status === 400) {
                    if (error.response.data && error.response.data.errors) {
                        const serverErrors = error.response.data.errors;
                        let errorMessage = 'Please correct the following errors:\n';
                        for (let field in serverErrors) {
                            errorMessage += `${field}: ${serverErrors[field].message}\n`;
                        }
                        setMessage(errorMessage);
                    } else if (error.response.data.error && error.response.data.error.includes('Email already in use')) {
                        setMessage('User already exists');
                    } else {
                        setMessage(error.response.data.error || 'Already registered.');
                    }
                } else {
                    setMessage('Network error, please try again.');
                }
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
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="String"
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
                            type="String"
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
                            type="String"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="String"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="String"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="Number"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <span className="error">{errors.contact}</span>}
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <button
                    className="login-button"
                    onClick={() => navigate('/login')}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Registration;
