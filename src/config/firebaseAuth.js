// initialise the gooolgprovider class then initialsie getAuth 

import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwANLQKzaZneAXedPADfVLMcHlDwAmOYc",
  authDomain: "swiggy-project-1b26e.firebaseapp.com",
  projectId: "swiggy-project-1b26e",
  storageBucket: "swiggy-project-1b26e.firebasestorage.app",
  messagingSenderId: "275485608846",
  appId: "1:275485608846:web:5c9f5708850db27e7272df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider
const auth = getAuth(app)


export {provider,auth}