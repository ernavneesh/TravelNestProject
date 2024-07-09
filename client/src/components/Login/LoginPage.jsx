import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import loginImage from '../../assets/images/Login.png';
import { SessionContext } from '../../context/SessionContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { handleLogin } = useContext(SessionContext);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:3000/api/users/login';
        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Full response:', data); // Log the entire response object

            const { firstName, email, _id: userId } = data.UserInfo; // Extract firstName, email, and userId from the response
            console.log('User info from response:', firstName, email, userId); // Log user info for debugging
            handleLogin(firstName, email, userId);

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-page_loginPageStyle">
            <div className="login-container_loginPageStyle">
                <div className="login-image_loginPageStyle">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="login-form_loginPageStyle">
                    <form onSubmit={handleLoginSubmit}>
                        <h2>Login</h2>
                        <div className="form-group_loginPageStyle">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group_loginPageStyle">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button_loginPageStyle">
                            Login
                        </button>
                    </form>
                    <button
                        className="register-button_loginPageStyle"
                        onClick={() => (window.location.href = '/register')}
                    >
                        Go to Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
