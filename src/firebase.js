// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, limit, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWC-ipYp1cqs8CeLHJviGA3telZK6hJWg",
  authDomain: "career-web-application.firebaseapp.com",
  projectId: "career-web-application",
  storageBucket: "career-web-application.appspot.com",
  messagingSenderId: "61060260911",
  appId: "1:61060260911:web:a7c7f1318e7732297652da",
  measurementId: "G-RC9NEXVS26"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Fetch a whole collection as plain objects with their document id attached.
 * Every page needs this, and the id has to come first so a stored `id` field
 * can never shadow the real document id.
 *
 * Pass `max` to cap how many documents come over the wire (used by the
 * signed-out landing pages, which only render a handful of teaser cards).
 */
const fetchCollection = async (collectionName, { max } = {}) => {
  const ref = collection(db, collectionName);
  const snapshot = await getDocs(max ? query(ref, limit(max)) : ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { addDoc, auth, collection, db, fetchCollection, getDocs };
