// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC06fx468g-0lD8-2MoTnJ-Wf7JY6Fo9ec",
  authDomain: "agrosmart-f94f1.firebaseapp.com",
  projectId: "agrosmart-f94f1",
    // storageBucket: "agrosmart-f94f1.appspot.com",
  // storageBucket: "agrosmart-f94f1.firebasestorage.app",
  messagingSenderId: "895334779402",
  appId: "1:895334779402:web:23bf3ed49132d6464a6df3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
