// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-MkzGejmrQ-Ak66aiqNIyvBp-Xm8DKec",
  authDomain: "kisya-74ac7.firebaseapp.com",
  projectId: "kisya-74ac7",
  storageBucket: "kisya-74ac7.appspot.com",
  messagingSenderId: "632807406142",
  appId: "1:632807406142:web:bac02be726397de8736f6f",
  measurementId: "G-7LQEG4XPRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };