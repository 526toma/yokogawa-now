// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh889N6knOdsZ3ZcA5jCFZUSFFizRHY9A",
  authDomain: "yokogawa-now.firebaseapp.com",
  projectId: "yokogawa-now",
  storageBucket: "yokogawa-now.appspot.com",
  messagingSenderId: "25944368904",
  appId: "1:25944368904:web:09b6a4e0ba296da0682ebd",
  measurementId: "G-KGF6PEW2EB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

