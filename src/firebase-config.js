import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGOkD1yVsPRHMtpHYy-ucRxxPWm1-ahFU",
  authDomain: "react-todo-app-fe5e0.firebaseapp.com",
  projectId: "react-todo-app-fe5e0",
  storageBucket: "react-todo-app-fe5e0.appspot.com",
  messagingSenderId: "305797674337",
  appId: "1:305797674337:web:541a6ef98b021734c94120",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
