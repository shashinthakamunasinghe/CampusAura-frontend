import React , {useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GrUpload } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import { validateRegistration, completeStudentRegistration } from '../../services/api';
import './AuthenticationPages.css';

function StudentRegister() {


    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [idImage,setIdImage] = useState(null);
    const [degreeProgram, setDegreeProgram] = useState('');
    const [error,setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Upload student ID to Firebase Storage
    const uploadStudentId = async (file, uid) => {
        try {
            const storageRef = ref(storage, `student-ids/${uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (err) {
            console.error('Failed to upload student ID:', err);
            throw new Error('Failed to upload student ID. Please try again.');
        }
    };

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

            //Email domain validation
            if(!email.endsWith('@std.uwu.ac.lk')){
                setError("Please use your student email to register.");
                setLoading(false);
                return;
            }

            //Name validation
            if(!name){
                setError("Name is required");
                setLoading(false);
                return;
            }

            //Handle degree program selection
            if(!degreeProgram){
                setError("Please select your degree program.");
                setLoading(false);
                return;
            }

            //ID image upload validation
            if(!idImage){
                setError("Student ID image is required for verification.");
                setLoading(false);
                return;
            }

            // Step 1: Validate email with backend
            console.log('Validating email with backend...');
            const validationResult = await validateRegistration(email, 'student');
            
            if (!validationResult.valid) {
                setError(validationResult.error || 'Email validation failed');
                setLoading(false);
                return;
            }

            console.log('Email validated successfully:', validationResult);

            // Step 2: Create Firebase account
            console.log('Creating Firebase account...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Step 3: Update display name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            console.log('Firebase account created:', userCredential.user.uid);

            // Step 4: Upload student ID to Firebase Storage
            console.log('Uploading student ID...');
            const studentIdUrl = await uploadStudentId(idImage, userCredential.user.uid);
            console.log('Student ID uploaded:', studentIdUrl);

            // Step 5: Get Firebase token
            const token = await userCredential.user.getIdToken();

            // Step 6: Complete registration with backend
            console.log('Completing registration with backend...');
            const result = await completeStudentRegistration(token, {
                name: name,
                email: email,
                degreeProgram: degreeProgram,
                studentIdUrl: studentIdUrl
            });

            console.log('Registration completed:', result);
            alert('Student registration successful! Welcome to CampusAura!');
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
        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required /> <br/>


        {/* Email */}
        <label htmlFor="email">Email:</label><br />
        <input type="email" placeholder='student@std.uwu.ac.lk' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br/>
        <span>Use your university email address</span><br/> 

        {/* Password */}
        <label htmlFor="password">Password:</label><br />
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /><br />

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
        <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
        </button><br/><br/>

        <div className='auth-Link'> 
          <span>Already have an account? </span><Link to="/login">Login</Link>
        </div>

       </form>
      </div> 
    
  )
}

export default StudentRegister
