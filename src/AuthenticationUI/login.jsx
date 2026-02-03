import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate, Link } from "react-router-dom";
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
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(
                auth, 
                email.trim(), 
                password.trim()
            );
            
            const user = userCredential.user;
            const uid = user.uid;
            
            // 🔑 Get Firebase ID token
            const idToken = await user.getIdToken();

            // Fetch user role from backend with Authorization header
            const response = await fetch(`${API_BASE_URL}/api/users/${uid}`, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();

            // Navigate based on role
            if (userData.role === "ADMIN") {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>CampusAura</h1>
                <h2>User Login</h2>
                <p>Sign in to access your student portal</p>

                {/*Error Message */}
                {error && <p className='error_message'>{error}</p>}

                {/* Form */}
                <form className='auth-form' onSubmit={handleLogin}>

                    {/* Email */}
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" value={email} placeholder='abc@gmail.com' onChange={(e) => setEmail(e.target.value)} required /> <br />

                    {/* Password */}
                    <label htmlFor="password">Password:</label>
                    <a className='forgetpwd'>Forget Password</a><br />
                    <input type="password" id="password" value={password} placeholder='Enter Your password' onChange={(e) => setPassword(e.target.value)} required /><br /><br />

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
