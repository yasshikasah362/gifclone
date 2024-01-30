

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import {getAuth} from "/firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEr_cULGtinCFPECEY8kxgcPtJoHJ9Fks",
  authDomain: "task1ofalphabi.firebaseapp.com",
  projectId: "task1ofalphabi",
  storageBucket: "task1ofalphabi.appspot.com",
  messagingSenderId: "205002353503",
  appId: "1:205002353503:web:ec0434f080ff2e3b1164ea",
  measurementId: "G-SE7E7RTS3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default function firebase() {
   <>
   Nothing is here
   </>
}