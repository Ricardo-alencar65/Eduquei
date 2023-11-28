// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSKhDOFHh82BzvWGkVzkmbm-yEUAIIT-M",
  authDomain: "eduquei-46dd6.firebaseapp.com",
  projectId: "eduquei-46dd6",
  storageBucket: "eduquei-46dd6.appspot.com",
  messagingSenderId: "738783753161",
  appId: "1:738783753161:web:4d330ef0eaae2c265eae18",
  measurementId: "G-EPRMT7CEWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)