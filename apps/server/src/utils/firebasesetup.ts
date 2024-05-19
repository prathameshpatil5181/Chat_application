// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDAXeFeKxc6ZTCymhLQO6HGK101nwBWTSQ",
  authDomain: "chatapplication-c95ff.firebaseapp.com",
  projectId: "chatapplication-c95ff",
  storageBucket: "chatapplication-c95ff.appspot.com",
  messagingSenderId: "782042864718",
  appId: "1:782042864718:web:b431a243c9fe01e296371f",
};

// Initialize Firebase
export const firebaseStorage = initializeApp(firebaseConfig);
