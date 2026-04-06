import React , {useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig'; 
import { useNavigate , Link } from "react-router-dom";
import { validateRegistration, completeExternalUserRegistration } from '../../services/api';
import './AuthenticationPages.css';

function ExternalRegister() {

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            //Password match validation
            if(password !== confirmPassword){
                setError("Passwords do not match");
                setLoading(false);
                return;
            }

            //Verify email is not empty
            if(!email){
                setError("Email is required");
                setLoading(false);
                return;
            }

            //Name validation
            if(!name){
                setError("Name is required");
                setLoading(false);
                return;
            }

            // Ensure external users don't use student email
            if(email.endsWith('@std.uwu.ac.lk')){
                setError("University email should register as Student, not External User.");
                setLoading(false);
                return;
            }

            // Step 1: Validate email with backend
            console.log('Validating email with backend...');
            const validationResult = await validateRegistration(email, 'external');
            
            if (!validationResult.valid) {
                setError(validationResult.error || 'Email validation failed');
                setLoading(false);
                return;
            }

            console.log('Email validated successfully:', validationResult);

            // Show limitation message
            if (validationResult.note) {
                console.log('Note:', validationResult.note);
            }

            // Step 2: Create Firebase account
            console.log('Creating Firebase account...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Step 3: Update display name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            console.log('Firebase account created:', userCredential.user.uid);

            // Step 4: Get Firebase token
            const token = await userCredential.user.getIdToken();

            // Step 5: Complete registration with backend
            console.log('Completing registration with backend...');
            const result = await completeExternalUserRegistration(token, {
                name: name,
                email: email
            });

            console.log('Registration completed:', result);
            alert('Registration successful! Welcome to CampusAura!');
            
            // Show limitation message if present
            if (result.note) {
                alert(result.note);
            }
            
            navigate('/');

        } catch(err){
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Please try again.');
            
            // If Firebase account was created but backend failed, user should try logging in
            if (err.message.includes('email-already-in-use')) {
                setError('This email is already registered. Please try logging in.');
            }
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>

      {/*Error Message */}
      {error && <p className='error_message'>{error}</p>}

      {/* Form */}
        <form className='auth-form' onSubmit={handleRegister}>

        {/* Name */}
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} required /> <br/>

        {/* Email */}
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" value={email} placeholder='abc@gmail.com' onChange={(e) => setEmail(e.target.value)} required /> <br/>


        {/* Password */}
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} required minLength={6} /><br />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password:</label><br />
        <input type="password" id="confirmPassword" value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required /><br /><br/>

        {/* Register button */}
        <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
        </button><br/><br/>

      <p className='note' style={{fontSize: '0.9em', color: '#666'}}>
        Note: External users can browse and buy items, but cannot sell items.
      </p>

      <div className='auth-Link'> 
        <span>Already have an account? </span><Link to="/login">Login</Link>
      </div>

        </form>
        </div>

  )
}

export default ExternalRegister
