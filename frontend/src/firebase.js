// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzOjvnFJYqUoTwTc0amblxkrJeiss6j60",
  authDomain: "r-cube-90296.firebaseapp.com",
  projectId: "r-cube-90296",
  storageBucket: "r-cube-90296.appspot.com",
  messagingSenderId: "445025202763",
  appId: "1:445025202763:web:fc4b306e2515348ac413ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// app();