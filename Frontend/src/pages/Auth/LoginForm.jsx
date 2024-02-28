import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://modern-notes-app-urwh.onrender.com//login', { username, password });
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
        alert('Logged out successfully');
        window.location.href = '/';
    }

    return (
        <div className="container" style={styles.container}>
            <form className={styles.from} onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
                <button type="submit" style={styles.button}>Login</button>
            </form>
            {/* <button >
                <Navigate to="/signup" style={styles.button}>Signup</Navigate>
            </button> */}
            <button className="logout-btn" onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
    },
    input: {
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        marginBottom: '20px',
        padding: '0 10px',
        fontSize: '16px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    logoutButton: {
        marginTop: '20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default LoginForm;
