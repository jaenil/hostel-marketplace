import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCTbIDBJcJWEYX9fReHNEVEaPkQP9UhTb8",
  authDomain: "hostel-marketplace-ca493.firebaseapp.com",
  projectId: "hostel-marketplace-ca493",
  storageBucket: "hostel-marketplace-ca493.firebasestorage.app",
  messagingSenderId: "679336857195",
  appId: "1:679336857195:web:d2e16657453658c74feb2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Authentication functions
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signupWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};