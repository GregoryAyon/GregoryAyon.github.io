import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQwIT2MrYFEg5PfAiYRFUK9lrsRjpq-z8",
  authDomain: "photo-gallery-auth-50bc0.firebaseapp.com",
  projectId: "photo-gallery-auth-50bc0",
  storageBucket: "photo-gallery-auth-50bc0.appspot.com",
  messagingSenderId: "82784955381",
  appId: "1:82784955381:web:837c413d2875ddce4acebc",
  measurementId: "G-QYTFR1SH7H",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
