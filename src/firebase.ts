// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsSfvZDIO8Tb2XAuGPrt0ZGx_59M-POyU",
  authDomain: "kidzie-48f66.firebaseapp.com",
  projectId: "kidzie-48f66",
  storageBucket: "kidzie-48f66.firebasestorage.app",
  messagingSenderId: "707205826693",
  appId: "1:707205826693:web:a997da2be5f759014c81ec",
  measurementId: "G-PP9BCHRJED"
};

// Initialize Firebase (reuse existing app if present)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);