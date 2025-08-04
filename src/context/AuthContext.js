// src/context/AuthContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase'; // Make sure this path to your firebase.js is correct

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener from Firebase checks for login/logout changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user to the logged-in user object, or null if logged out
      setLoading(false);
    });

    // Cleanup the listener when the component is removed
    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



// 3. Create the Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};