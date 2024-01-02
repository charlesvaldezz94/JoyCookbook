import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyBKPRIbuV7MuF83Bvs9xLUr7C2XpEvd9jU",
    authDomain: "joycookbook-84fe9.firebaseapp.com",
    projectId: "joycookbook-84fe9",
    storageBucket: "joycookbook-84fe9.appspot.com",
    messagingSenderId: "787071370217",
    appId: "1:787071370217:web:cabc91f7d24e9a26e0c178",
    measurementId: "G-GC697SN97W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ACESS AUTHENTICATION STATE
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return { currentUser };
};

// SIGN IN WITH EMAIL
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// SIGN OUT
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// EXPORT DATABASE
export { db };
