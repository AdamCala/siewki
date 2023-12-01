// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPEvGc8Yo0SbWNMlLRC95f_l9AUYeIPG0",
  authDomain: "siewki.firebaseapp.com",
  projectId: "siewki",
  storageBucket: "siewki.appspot.com",
  messagingSenderId: "75573424546",
  appId: "1:75573424546:web:74091a434cac755c3782fb",
  measurementId: "G-C0T1RBH148",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
