import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCixJAOZ7rH_CLYz6JeYwDLb4f3-W-ExNc",
  authDomain: "book-review-app-8c9e6.firebaseapp.com",
  projectId: "book-review-app-8c9e6",
  storageBucket: "book-review-app-8c9e6.appspot.com",
  messagingSenderId: "640907965247",
  appId: "1:640907965247:web:7c8a55cb747c534aee998a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
