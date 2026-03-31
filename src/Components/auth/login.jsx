import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './AuthenticationPages.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Step 1: Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Step 2: Get Firebase ID token
            const token = await userCredential.user.getIdToken();
            
            // Step 3: Verify with backend and get user session
            const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Backend verification failed - sign out from Firebase
                await auth.signOut();
                throw new Error('Account verification failed. Please ensure you have completed registration or contact admin.');
            }

            const sessionData = await response.json();
            console.log('Login successful:', sessionData);
            
            // Step 4: Navigate to home page
            navigate('/');
            
        } catch (err) {
            console.error('Login error:', err);
            
            // User-friendly error messages
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password. Please try again.');
            } else if (err.code === 'auth/user-not-found') {
                setError('No account found with this email. Please sign up first.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed login attempts. Please try again later.');
            } else if (err.message.includes('verification failed')) {
                setError(err.message);
            } else if (err.message.includes('Failed to fetch')) {
                setError('Cannot connect to server. Please ensure the backend is running.');
            } else {
                setError(err.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <img src={logo} alt="CampusAura logo" className="auth-logo" />
                 
                <h2>User Login</h2>
                <p>Sign in to access your student portal</p>

                {/*Error Message */}
                {error && <p className='error_message'>{error}</p>}

                {/* Form */}
                <form className='auth-form' onSubmit={handleLogin}>

                    {/* Email */}
                    <label htmlFor="email">Email:</label><br />
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        placeholder='abc@gmail.com' 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        disabled={loading}
                    /> <br />

                    {/* Password */}
                    <label htmlFor="password">Password:</label>
                    <a className='forgetpwd'>Forget Password</a><br />
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        placeholder='Enter Your password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        disabled={loading}
                    /><br /><br />

                    {/* Login button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button><br /><br />

                    <div className='auth-Link'>
                        <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
                    </div>

                </form>
            </div>
        </div>


    )
}

export default Login
