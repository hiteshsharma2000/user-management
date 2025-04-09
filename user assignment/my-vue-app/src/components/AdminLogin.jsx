import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5000/auth/login', { username, password });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.href='/admin'
            setIsAuthenticated(true);
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div style={{ textAlign: 'center',display:"flex",flexDirection:"column",gap:"10px",marginLeft:"25%",marginRight:"25%" }}>
            <h2>Admin Login</h2>
            <input  placeholder='     Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder='     Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;