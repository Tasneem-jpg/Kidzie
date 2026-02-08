// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
