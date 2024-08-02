// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxD4jDtOh8NBe03bxv-QmQU1LgafZwudA",
  authDomain: "expense-tracker-3f582.firebaseapp.com",
  projectId: "expense-tracker-3f582",
  storageBucket: "expense-tracker-3f582.appspot.com",
  messagingSenderId: "424633813499",
  appId: "1:424633813499:web:5a920ad61e68b41096635e",
  measurementId: "G-LB16L6D0T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider();
const analytics = getAnalytics(app);
export const db=getFirestore(app);