
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5I97K0WYRewvBqnzHWhvq0YJyt_lF-f0",
  authDomain: "subsly-b7292.firebaseapp.com",
  projectId: "subsly-b7292",
  storageBucket: "subsly-b7292.firebasestorage.app",
  messagingSenderId: "746573860951",
  appId: "1:746573860951:web:c6701a548a19f4f5d8d312",
  measurementId: "G-1XG3FTDQBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
