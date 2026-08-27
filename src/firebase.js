import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDwiUnq4mSfQj_e-_nYZhdkaDstQoJCJ8",
  authDomain: "coffee-shop-6ebee.firebaseapp.com",
  projectId: "coffee-shop-6ebee",
  storageBucket: "coffee-shop-6ebee.firebasestorage.app",
  messagingSenderId: "632920529626",
  appId: "1:632920529626:web:03c28642e11c52f4d6a3e3",
  measurementId: "G-3D8Q9DZ9EY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);