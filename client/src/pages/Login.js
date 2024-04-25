import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Assuming auth and db are your Firebase auth and Firestore database instances
import { setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc from the Firestore package
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [action, setAction] = useState('Sign Up');

  const handleSignUp = async () => {
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user details in Firestore
      await addUserToDatabase(email, username);

      // You can add further logic here, such as redirecting the user to another page
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // You can add further logic here, such as redirecting the user to another page
    } catch (err) {
      console.error(err);
    }
  };

  // Function to add user details to Firestore
  const addUserToDatabase = async (email, username) => {
    try {
      // Add user details to Firestore users collection
      await setDoc(doc(db, 'users', email), { username });
    } catch (error) {
      console.error('Error adding user to database: ', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src="/person.png" alt="User Icon" />
            <input
              type="text"
              placeholder='User Name'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        
        <div className="input">
          <img src="/email.png" alt="Email Icon" />
          <input
            type="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src="/password.png" alt="Password Icon" />
          <input
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Sign Up" ? null : (
          <div className="forgot-password"><span>Forgot Password?</span></div>
        )}
        
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={action === "Login" ? handleLogin : handleSignUp}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Login")}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
