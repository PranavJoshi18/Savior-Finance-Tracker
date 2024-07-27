import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDB0YWVATyRH_wX5GK3pcDUbh8CkP9_Fs8",
  authDomain: "savior-finance-tracker.firebaseapp.com",
  projectId: "savior-finance-tracker",
  storageBucket: "savior-finance-tracker.appspot.com",
  messagingSenderId: "343265872875",
  appId: "1:343265872875:web:52d158a38efd4e77db67ae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();