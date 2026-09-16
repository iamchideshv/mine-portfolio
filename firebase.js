// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW6w_NF6h8UifE7hF-IcohqomYgsjW6C0",
  authDomain: "chideshportfolio.firebaseapp.com",
  projectId: "chideshportfolio",
  storageBucket: "chideshportfolio.firebasestorage.app",
  messagingSenderId: "534013511251",
  appId: "1:534013511251:web:932bd80fae226c721aa8a6",
  measurementId: "G-TMVHJQF5EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  }
}).catch((err) => {
  console.warn("Firebase Analytics could not be initialized:", err);
});

// Expose globally so portfolio.html inline script can use them
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.getFirebaseAnalytics = () => analytics;

export { app, auth, db, analytics };
