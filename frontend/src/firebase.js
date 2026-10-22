import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDofMh4S_yrpi0XO89BVs7pWTIYuJItqww",
  authDomain: "saradhya-jewels.firebaseapp.com",
  projectId: "saradhya-jewels",
  storageBucket: "saradhya-jewels.firebasestorage.app",
  messagingSenderId: "230381226848",
  appId: "1:230381226848:web:89e4da2aac7cf7eeebac05",
  measurementId: "G-YBJBMQ9ME0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
