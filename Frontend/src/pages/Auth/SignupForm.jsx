import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://modern-notes-app-urwh.onrender.com//signup', { username, email, password });
            alert('User created successfully');
        } catch (error) {
            console.error(error);
            alert('Error creating user');
        }
    };

    return (
        <div className="container" style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
                <button type="submit" style={styles.button}>Signup</button>
                <button>
                    <a href="/login" >Login</a>
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
};

export default SignupForm;
