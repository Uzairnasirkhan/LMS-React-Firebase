// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-fcaooDLpKHGVwVS7ACORcn4J3yzuhqw",
  authDomain: "lms-software-7654a.firebaseapp.com",
  projectId: "lms-software-7654a",
  storageBucket: "lms-software-7654a.firebasestorage.app",
  messagingSenderId: "133842573828",
  appId: "1:133842573828:web:1edd4bf5273a3ef24d3351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app) 

