// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Q8arn88z92s5rO1XQT0fxjLgx4P2yFw",
  authDomain: "twisted-literature.firebaseapp.com",
  projectId: "twisted-literature",
  storageBucket: "twisted-literature.appspot.com",
  messagingSenderId: "439936251843",
  appId: "1:439936251843:web:e484b2ae42c848cd6e2f76",
  measurementId: "G-XBQMK29HLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
