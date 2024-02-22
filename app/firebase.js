// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWToXOHKdGrIn9ZXnHRQjMdrItcLb3ZFM",
  authDomain: "basedmemes-bacec.firebaseapp.com",
  projectId: "basedmemes-bacec",
  storageBucket: "basedmemes-bacec.appspot.com",
  messagingSenderId: "508711535264",
  appId: "1:508711535264:web:3199fdbd335dd5bdbfffc5",
  measurementId: "G-RCVWM40BWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
