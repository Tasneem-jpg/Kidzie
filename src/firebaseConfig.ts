// src/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZRiJoRgohL5NKIu_Nw3eQKfmv2MRadpc",
  authDomain: "kidzie-6cf51.firebaseapp.com",
  projectId: "kidzie-6cf51",
  storageBucket: "kidzie-6cf51.appspot.com",
  messagingSenderId: "230843656135",
  appId: "1:230843656135:web:71a788abe54bd17e29dbe2",
};

// Initialize Firebase (reuse existing app if present)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
