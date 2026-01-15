
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqp8LLLgPJFak8PUrCeZOFoheuRPgu_kM",
  authDomain: "campusconnect-a8b34.firebaseapp.com",
  projectId: "campusconnect-a8b34",
  storageBucket: "campusconnect-a8b34.firebasestorage.app",
  messagingSenderId: "556735100549",
  appId: "1:556735100549:web:d1d86e5892d6cb28319bec",
  measurementId: "G-D27FMSXQC7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);