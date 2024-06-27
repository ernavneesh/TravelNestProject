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

        if (!formData.contactNumber) {
            tempErrors.contactNumber = "Contact Number is required.";
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
                console.log(response)
                setMessage('Registration successful!');
            } catch (error) {
                console.log("error",error)
                if (error.response && error.response.status === 400 && error.response.data && error.response.data.errmsg) {
                    if (error.response.data.errmsg.includes('duplicate key error')) {
                        setMessage('User Already Exists');
                    } else {
                        setMessage('Please try again.');
                    }
                } else {
                    setMessage(' Please try again.');
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
                            type="number"
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
