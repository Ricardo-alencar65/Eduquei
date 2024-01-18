
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyCSKhDOFHh82BzvWGkVzkmbm-yEUAIIT-M",
  authDomain: "eduquei-46dd6.firebaseapp.com",
  projectId: "eduquei-46dd6",
  storageBucket: "eduquei-46dd6.appspot.com",
  messagingSenderId: "738783753161",
  appId: "1:738783753161:web:4d330ef0eaae2c265eae18",
  measurementId: "G-EPRMT7CEWJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)