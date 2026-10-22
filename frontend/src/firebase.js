import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAX-_7b2tK7vuGXP6lTJIR9Fyz8Vbt9LkE",
  authDomain: "saradhya-jewelsandrentals.firebaseapp.com",
  projectId: "saradhya-jewelsandrentals",
  storageBucket: "saradhya-jewelsandrentals.firebasestorage.app",
  messagingSenderId: "617083563163",
  appId: "1:617083563163:web:97e362af680e274df26a3e",
  measurementId: "G-XVLDNQ3B5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
