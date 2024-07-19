import { getAuth, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({
    name: '',
    information: '',
    email: user.email,
  });
  const [newProfile, setNewProfile] = useState({
    name: '',
    information: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        }
      } catch (error) {
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, [db, user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newProfile.email) {
        await updateEmail(user, newProfile.email);
        setProfile((prev) => ({
          ...prev,
          email: newProfile.email,
        }));
      }

      if (newProfile.password) {
        await updatePassword(user, newProfile.password);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name: newProfile.name || profile.name,
        information: newProfile.information || profile.information,
      });

      setProfile({
        name: newProfile.name || profile.name,
        information: newProfile.information || profile.information,
        email: newProfile.email || profile.email,
      });
      setError(null);
    } catch (error) {
      setError('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError('Failed to log out.');
    }
  };

  return (
    <div className="profile container">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      <div className="profile-info">
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Information: {profile.information}</p>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="name"
          placeholder="New Name"
          value={newProfile.name}
          onChange={handleChange}
        />
        <textarea
          name="information"
          placeholder="New Information"
          value={newProfile.information}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="New Email"
          value={newProfile.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={newProfile.password}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default Profile;
