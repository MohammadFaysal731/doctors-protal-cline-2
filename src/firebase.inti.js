// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZF9FzBdQeGDLa99mVXgB5NICDUL0SOxY",
  authDomain: "doctors-portal-26f38.firebaseapp.com",
  projectId: "doctors-portal-26f38",
  storageBucket: "doctors-portal-26f38.appspot.com",
  messagingSenderId: "973293815080",
  appId: "1:973293815080:web:c72d8c356ec6d80157fc1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app)


export default auth
