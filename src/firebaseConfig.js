// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj-A8_vOtX6ux8m_Mlk51L8LzXXvnOav0",
  authDomain: "mallorca-app-project-firebase.firebaseapp.com",
  projectId: "mallorca-app-project-firebase",
  storageBucket: "mallorca-app-project-firebase.firebasestorage.app",
  messagingSenderId: "577970491560",
  appId: "1:577970491560:web:958244582a78800239f29d",
  measurementId: "G-6FZN396HTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);