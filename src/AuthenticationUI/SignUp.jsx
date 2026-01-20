import React , {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig'; 
import { useNavigate , Link } from "react-router-dom";
import './AuthenticationPages.css';

function NormalUserSignUp() {

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        //Paassword match validation
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

        //Verify email is not empty
        if(!email){
            setError("Email is required");
            return;
        }

        //Name validation
        if(!name){
            setError("Name is required");
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password);
            //alert("Registration successful!");
            navigate('/');
        }catch(err){
            setError(err.message);
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
        <input type="password" id="password" value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} required /><br />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password:</label><br />
        <input type="password" id="confirmPassword" value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required /><br /><br/>

        {/* Register button */}
        <button type="submit">Register</button><br/><br/>


      <div className='auth-Link'> 
        <span>Already have an account? </span><Link to="/login">Login</Link>
      </div>

        </form>
        </div>

  )
}

export default NormalUserSignUp
