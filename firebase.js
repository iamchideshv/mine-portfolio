// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  }
}).catch((err) => {
  console.warn("Firebase Analytics could not be initialized:", err);
});

// Expose globally for convenience
window.firebaseApp = app;
window.getFirebaseAnalytics = () => analytics;

export { app, analytics };
