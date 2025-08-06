import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/register`, { username, password });
            // On success, redirect to the login page with a success message
            navigate('/login', {
                state: { message: 'Registration successful! Please log in.' }
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <article>
            <hgroup>
                <h1>Register</h1>
                <h2>Create a new account</h2>
            </hgroup>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    aria-label="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    required
                />
                {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
                <button type="submit" aria-busy={loading}>
                    {loading ? 'Registering…' : 'Register'}
                </button>
            </form>
            <footer>
                <Link to="/login">Already have an account? Sign in</Link>
            </footer>
        </article>
    );
};

export default Register;