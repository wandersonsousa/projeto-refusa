// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZ6V2fsbykM3tXE-w6E9-CjsRam2riwE",
  authDomain: "refusa-teste.firebaseapp.com",
  projectId: "refusa-teste",
  storageBucket: "refusa-teste.appspot.com",
  messagingSenderId: "1006796495570",
  appId: "1:1006796495570:web:43ca67757a8b249d08eb0b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export default { db, storage, auth };
