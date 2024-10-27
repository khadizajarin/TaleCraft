// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNYQHlyu90XETbvgbYXOGMazmODAVEpj4",
  authDomain: "talecraft-d8734.firebaseapp.com",
  projectId: "talecraft-d8734",
  storageBucket: "talecraft-d8734.appspot.com",
  messagingSenderId: "400460587649",
  appId: "1:400460587649:web:deb503530e43b93167a380"
};

// console.log("Firebase Config:", firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };