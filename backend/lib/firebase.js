// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQZczHduTZQHCAr9D-j8DeEB_lwZ7UdHA",
    authDomain: "my-awesome-wishlist-project.firebaseapp.com",
    projectId: "my-awesome-wishlist-project",
    storageBucket: "my-awesome-wishlist-project.firebasestorage.app",
    messagingSenderId: "16170860637",
    appId: "1:16170860637:web:a60e59df39f4bd50394db4",
    measurementId: "G-1NY9VZ7K7K"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export default auth;
