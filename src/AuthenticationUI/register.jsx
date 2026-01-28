import React , {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { GrUpload } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import './AuthenticationPages.css';

function Register() {


    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [idImage,setIdImage] = useState(null);
    const [degreeProgram, setDegreeProgram] = useState('');
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

        //Email domain validation
        if(!email.endsWith('@std.uwu.ac.lk')){
            setError("Please use your student email to register.");
            return;
        }

        //Name validation
        if(!name){
            setError("Name is required");
            return;
        }

        //Handle degree degree program selection
        if(!degreeProgram){
            setError("Please select your degree program.");
            return;
        }

        //ID image upload validation
        if(!idImage){
            setError("Student ID image is required for verification.");
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
        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required /> <br/>


        {/* Email */}
        <label htmlFor="email">Email:</label><br />
        <input type="email" placeholder='student@std.uwu.ac.lk' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br/>
        <span>Use your university email address</span><br/> 

        {/* Password */}
        <label htmlFor="password">Password:</label><br />
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password:</label><br />
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><br />

        {/*Select Degree Program */}
        <label htmlFor="degreeProgram">Degree Program:</label><br />
        <select value={degreeProgram} onChange={(e) => setDegreeProgram(e.target.value)} required>
            <option value="">Select Degree Program</option>
            <option value="Information & Communication Technology (BICT)">Information & Communication Technology (BICT)</option>
            <option value="Engineering Technology (BET)">Engineering Technology (BET)</option>
            <option value="Bio-systems Technology (BST)">Bio-systems Technology (BST)</option>
            <option value="Animal Production and Food Technology / Animal Science">Animal Production and Food Technology / Animal Science</option>
            <option value="Aquatic Resources and Technology">Aquatic Resources and Technology</option>
            <option value="Export Agriculture">Export Agriculture</option>
            <option value="Palm and Latex Technology">Palm and Latex Technology</option>
            <option value="Tea Technology">Tea Technology</option>
            <option value="Plantation Management and Technology">Plantation Management and Technology</option>
            <option value="Computer Science & Technology">Computer Science & Technology</option>
            <option value="Industrial Information Technology">Industrial Information Technology</option>
            <option value="Mineral Resources & Technology">Mineral Resources & Technology</option>
            <option value="Science & Technology">Science & Technology</option>
            <option value="Entrepreneurship & Management">Entrepreneurship & Management</option>
            <option value="Hospitality Tourism & Event Management">Hospitality Tourism & Event Management</option>
            <option value="Human Resource Development">Human Resource Development</option>
            <option value="English Language and Applied Linguistics">English Language and Applied Linguistics</option>
            <option value="Bachelor of Medicine, Bachelor of Surgery Degree programme">Bachelor of Medicine, Bachelor of Surgery Degree programme</option>
            <option value="Other">Other</option>
        </select><br />

        {/* Student ID upload */}
        <label htmlFor="idImage">Upload Student ID:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setIdImage(e.target.files[0])} required /><br />
        <div className='upload-instructions'> 
        <GrUpload /> 
        <span>
            Upload a clear photo of your student ID for verification purposes
        </span><br/><br/>
        </div>

        {/* Register button */}
        <button type="submit">Register</button><br/><br/>

        <div className='auth-Link'> 
          <span>Already have an account? </span><Link to="/login">Login</Link>
        </div>

       </form>
      </div> 
    
  )
}

export default Register
