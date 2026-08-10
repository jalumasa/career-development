import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut, updateEmail } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaGoogle } from 'react-icons/fa';
import LoadingIndicator from '../components/LoadingIndicator';
import './Profile.css';

const auth = getAuth();
const db = getFirestore();

const Profile = () => {
  const user = auth.currentUser;
  const isGoogleUser = user.providerData.some((p) => p.providerId === 'google.com');

  const [profile, setProfile] = useState({ name: '', information: '' });
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newInformation, setNewInformation] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        let data = userDoc.exists() ? userDoc.data() : {};

        // Self-heal: accounts created before this field existed (or via
        // Google, before that was wired up) may be missing a name even
        // though Firebase Auth already has one from the sign-in provider.
        if (!data.name && user.displayName) {
          data = { ...data, name: user.displayName };
          updateDoc(userRef, { name: user.displayName }).catch((err) =>
            console.error('Failed to backfill name:', err)
          );
        }

        setProfile(data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.uid, user.displayName]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = {
        name: newName.trim() || profile.name || '',
        information: newInformation.trim() || profile.information || '',
      };
      await updateDoc(doc(db, 'users', user.uid), updated);
      setProfile((prev) => ({ ...prev, ...updated }));
      setNewName('');
      setNewInformation('');
      setSuccess('Profile updated.');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setSavingEmail(true);
    setError(null);
    setSuccess(null);
    try {
      await updateEmail(user, newEmail.trim());
      await updateDoc(doc(db, 'users', user.uid), { email: newEmail.trim() });
      setNewEmail('');
      setSuccess('Email updated.');
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        setError('This is a sensitive change — please log out and back in, then try again.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('That email is already in use by another account.');
      } else {
        setError('Failed to update email.');
      }
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordReset = async () => {
    setSendingReset(true);
    setError(null);
    setSuccess(null);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setSuccess(`Password reset link sent to ${user.email}.`);
    } catch (err) {
      setError('Failed to send reset email.');
    } finally {
      setSendingReset(false);
    }
  };

  const handleResendVerification = async () => {
    setSendingVerification(true);
    setError(null);
    setSuccess(null);
    try {
      await sendEmailVerification(user);
      setSuccess('Verification email sent.');
    } catch (err) {
      setError('Failed to send verification email.');
    } finally {
      setSendingVerification(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Failed to log out.');
    }
  };

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  const initials = (profile.name || user.email || '?').trim().charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="profile container">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="profile container">
      <div className="profile-header">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="profile-avatar" referrerPolicy="no-referrer" />
        ) : (
          <div className="profile-avatar profile-avatar-fallback">{initials}</div>
        )}
        <h1>{profile.name || 'Your Profile'}</h1>
        {memberSince && <p className="profile-meta">Member since {memberSince}</p>}
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section className="profile-section">
        <h2>Profile</h2>
        {profile.information && !newInformation && (
          <p className="profile-current-value">{profile.information}</p>
        )}
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <div className="profile-form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder={profile.name || 'Your name'}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="information">About</label>
            <textarea
              id="information"
              placeholder={profile.information || 'A little about you'}
              value={newInformation}
              onChange={(e) => setNewInformation(e.target.value)}
            />
          </div>
          <button type="submit" disabled={savingProfile}>
            {savingProfile ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </section>

      <section className="profile-section">
        <h2>Account &amp; Security</h2>

        <div className="profile-account-row">
          <span>Signed in with</span>
          <span className="provider-badge">
            {isGoogleUser ? <><FaGoogle /> Google</> : 'Email & password'}
          </span>
        </div>

        <div className="profile-account-row">
          <span>Email</span>
          <span>{user.email}</span>
        </div>

        <div className="profile-account-row">
          <span>Verification</span>
          {user.emailVerified ? (
            <span className="verified-badge"><FaCheckCircle /> Verified</span>
          ) : (
            <button type="button" className="link-button" onClick={handleResendVerification} disabled={sendingVerification}>
              <FaExclamationTriangle /> {sendingVerification ? 'Sending…' : 'Not verified — resend email'}
            </button>
          )}
        </div>

        {!isGoogleUser && (
          <>
            <form onSubmit={handleEmailSubmit} className="profile-form">
              <div className="profile-form-group">
                <label htmlFor="new-email">Change email</label>
                <input
                  id="new-email"
                  type="email"
                  placeholder="New email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <button type="submit" disabled={savingEmail || !newEmail.trim()}>
                {savingEmail ? 'Updating…' : 'Update email'}
              </button>
            </form>

            <button type="button" className="secondary-button" onClick={handlePasswordReset} disabled={sendingReset}>
              {sendingReset ? 'Sending…' : 'Change password'}
            </button>
          </>
        )}
      </section>

      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default Profile;
