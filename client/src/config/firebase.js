import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Q8arn88z92s5rO1XQT0fxjLgx4P2yFw",
  authDomain: "twisted-literature.firebaseapp.com",
  projectId: "twisted-literature",
  storageBucket: "twisted-literature.appspot.com",
  messagingSenderId: "439936251843",
  appId: "1:439936251843:web:e484b2ae42c848cd6e2f76",
  measurementId: "G-XBQMK29HLJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);