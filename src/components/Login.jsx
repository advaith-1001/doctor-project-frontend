import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Check for a success message from the registration page
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <article>
            <hgroup>
                <h1>Sign in</h1>
                <h2>Access the doctor appointment portal</h2>
            </hgroup>
            
            {/* Display success or error messages */}
            {successMessage && <p style={{ color: 'var(--pico-color-green-500)' }}>{successMessage}</p>}
            {error && <p style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
            
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
                <button type="submit" aria-busy={loading}>
                    {loading ? 'Logging in…' : 'Login'}
                </button>
            </form>
            <footer>
                <Link to="/register">Don't have an account? Sign up</Link>
            </footer>
        </article>
    );
};

export default Login;