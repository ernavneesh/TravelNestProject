import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import registrationImage from '../../assets/images/image.png'; // Adjust the path to your image

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const validate = () => {
        let tempErrors = {};
        const nameRegex = /^[a-zA-Z]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNumberRegex = /^\d{10}$/;

        if (!formData.firstName) {
            tempErrors.firstName = "First Name is required.";
        } else if (!nameRegex.test(formData.firstName)) {
            tempErrors.firstName = "Write a valid first name.";
        }

        if (!formData.lastName) {
            tempErrors.lastName = "Last Name is required.";
        } else if (!nameRegex.test(formData.lastName)) {
            tempErrors.lastName = "Write a valid last name.";
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

        if (!formData.contactNumber) {
            tempErrors.contactNumber = "Contact Number is required.";
        } else if (!contactNumberRegex.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be 10 digits.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'firstName':
            case 'lastName':
                // Restrict input to alphabetic characters only
                if (/^[a-zA-Z]*$/.test(value) || value === '') {
                    setFormData({
                        ...formData,
                        [name]: value,
                    });
                }
                break;
            case 'email':
            case 'password':
            case 'confirmPassword':
                // Allow any characters for email, password, and confirmPassword
                setFormData({
                    ...formData,
                    [name]: value,
                });
                break;
            case 'contactNumber':
                // Restrict input to digits only and limit to 10 characters
                if (/^\d{0,10}$/.test(value) || value === '') {
                    setFormData({
                        ...formData,
                        [name]: value,
                    });
                }
                break;
            default:
                setFormData({
                    ...formData,
                    [name]: value,
                });
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:3000/api/register', formData);
                setMessage('Registration successful!');
            } catch (error) {
                setMessage('Registration failed. Please try again.');
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
                        <input
                            type="password"
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
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                        {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
