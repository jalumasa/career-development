import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const auth = getAuth();
const db = getFirestore();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user' // Default role is 'user'
      });

      setError(null);
      navigate('/'); // Redirect to home page after sign-up
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    }
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'User account is disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'Email is already in use.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="login">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Login;
