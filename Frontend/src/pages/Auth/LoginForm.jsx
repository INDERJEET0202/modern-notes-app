import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            alert(response.data.message);
            console.log(response.data);
            localStorage.setItem('userId', response.data.id);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LoginForm;
