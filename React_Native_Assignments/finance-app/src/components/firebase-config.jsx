import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsspYcfnPCSSCyre9gTWPheJCj5Jf6QDY",
  authDomain: "finance-app-c6f58.firebaseapp.com",
  projectId: "finance-app-c6f58",
  storageBucket: "finance-app-c6f58.appspot.com",
  messagingSenderId: "132217707816",
  appId: "1:132217707816:web:1195e79a2337cfc3d9841d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
