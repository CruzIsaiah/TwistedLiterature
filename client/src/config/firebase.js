import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; // Updated import
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";

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

// Create a custom hook to track the authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

// Function to fetch username from Firestore based on the user's email
export const fetchUsername = async (email) => {
  try {
    const userDoc = await getDoc(doc(collection(db, "users"), email));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.username;
    } else {
      console.error("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};
