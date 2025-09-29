// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Email validation function
const isValidIITJEmail = (email) => {
  return email.endsWith('@iitj.ac.in');
};

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Export initialized services
export { auth, db };

// Authentication functions
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    if (!isValidIITJEmail(email)) {
      throw new Error('Only IITJ email addresses (@iitj.ac.in) are allowed');
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signupWithEmailAndPassword = async (email, password, username) => {
  try {
    if (!isValidIITJEmail(email)) {
      throw new Error('Only IITJ email addresses (@iitj.ac.in) are allowed');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: username,
      email: email,
      createdAt: new Date().toISOString()
    });
    
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};