// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOOTPX-F6Jb57hpIQ-k1W37sSu-eE4-FM",
  authDomain: "quizo-da4a8.firebaseapp.com",
  projectId: "quizo-da4a8",
  storageBucket: "quizo-da4a8.firebasestorage.app",
  messagingSenderId: "659187151992",
  appId: "1:659187151992:web:0544beba7d20f0f19fa98d",
  measurementId: "G-VHF6NCV2YQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
