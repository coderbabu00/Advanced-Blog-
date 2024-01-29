// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9726b.firebaseapp.com",
  projectId: "mern-blog-9726b",
  storageBucket: "mern-blog-9726b.appspot.com",
  messagingSenderId: "567711943470",
  appId: "1:567711943470:web:86e4114fc105d85ef7c8bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);