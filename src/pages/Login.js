import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'reset'
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isSignUp = mode === 'signup';
  const isReset = mode === 'reset';
  const passwordHint = 'Password must be at least 8 characters long.';

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate('/');
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user'
      });

      try {
        await sendEmailVerification(user);
      } catch (verificationError) {
        // Account was created successfully either way — a failed verification
        // email isn't worth blocking sign-up over.
        console.error('Failed to send verification email:', verificationError);
      }

      setError(null);
      navigate('/');
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { isNewUser } = getAdditionalUserInfo(result) || {};

      if (isNewUser) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          name: result.user.displayName || '',
          role: 'user'
        });
      }

      setError(null);
      navigate('/');
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Google sign-in error:', error.code, error.message);
        setError(getFriendlyErrorMessage(error.code));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      // Don't reveal whether an account exists for this email — only surface
      // errors that aren't about existence (e.g. a malformed address).
      if (error.code !== 'auth/user-not-found') {
        setError(getFriendlyErrorMessage(error.code));
        setIsSubmitting(false);
        return;
      }
    }
    setError(null);
    setSuccess("If an account exists for that email, we've sent a link to reset your password.");
    setIsSubmitting(false);
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
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/email-already-in-use':
        return 'Email is already in use.';
      case 'auth/weak-password':
        return 'Password is too weak. It must be at least 8 characters long.';
      case 'auth/popup-blocked':
        return 'Your browser blocked the sign-in popup. Please allow popups and try again.';
      case 'auth/operation-not-allowed':
        return "Google sign-in isn't turned on for this app yet.";
      case 'auth/unauthorized-domain':
        return "This site isn't authorized for Google sign-in yet.";
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  if (isReset) {
    return (
      <div className="login">
        <h1>Reset Password</h1>
        <p className="login-subtitle">Enter your email and we'll send you a link to reset your password.</p>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button className="toggle-button" onClick={() => switchMode('login')}>
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="login">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>

      <button type="button" className="oauth-button" onClick={handleGoogleSignIn} disabled={isSubmitting}>
        <FcGoogle /> Continue with Google
      </button>

      <div className="login-divider"><span>or</span></div>

      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {isSignUp && <p className="password-hint">{passwordHint}</p>}
        {!isSignUp && (
          <button type="button" className="forgot-password" onClick={() => switchMode('reset')}>
            Forgot password?
          </button>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait…' : (isSignUp ? 'Sign Up' : 'Login')}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button className="toggle-button" onClick={() => switchMode(isSignUp ? 'login' : 'signup')}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Login;
