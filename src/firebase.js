// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

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

export { addDoc, auth, collection, db, getDocs };
