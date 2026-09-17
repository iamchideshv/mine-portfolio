// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU10VG1svxRALC7EMdR1A8mV66Hn9g07E",
  authDomain: "chidesh-portfolio-site.firebaseapp.com",
  projectId: "chidesh-portfolio-site",
  storageBucket: "chidesh-portfolio-site.firebasestorage.app",
  messagingSenderId: "198695072113",
  appId: "1:198695072113:web:403976b12eaefece8746d0"
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
