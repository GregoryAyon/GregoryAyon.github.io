import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_DpY3sHcJjo-83kpz138Dio9DjiAnlWo",
  authDomain: "hotel-app-b8ec0.firebaseapp.com",
  projectId: "hotel-app-b8ec0",
  storageBucket: "hotel-app-b8ec0.appspot.com",
  messagingSenderId: "1047029515481",
  appId: "1:1047029515481:web:a5aac26b75b498cdfceac8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
