import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({
    name: '',
    profilePicture: '',
    information: '',
  });
  const [newProfile, setNewProfile] = useState({
    name: '',
    profilePicture: null,
    information: '',
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
    const { name, value, files } = e.target;
    setNewProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureURL = profile.profilePicture;

      if (newProfile.profilePicture) {
        const profilePictureRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(profilePictureRef, newProfile.profilePicture);
        profilePictureURL = await getDownloadURL(profilePictureRef);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name: newProfile.name || profile.name,
        profilePicture: profilePictureURL,
        information: newProfile.information || profile.information,
      });

      setProfile({
        name: newProfile.name || profile.name,
        profilePicture: profilePictureURL,
        information: newProfile.information || profile.information,
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
        <img src={profile.profilePicture || 'default-profile.png'} alt="Profile" className="profile-picture" />
        <p>Name: {profile.name}</p>
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
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
        />
        <textarea
          name="information"
          placeholder="New Information"
          value={newProfile.information}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>
  );
};

export default Profile;
