import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //google sign in function
  const googleProvider = new GoogleAuthProvider();

  const signInGoogleFunc = () => {
    // setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //create email function
  const createUserFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //update profile

  const updateProfileFunc = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //sign with email and password
  const logInFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign out

  const signOutFunc = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    createUserFunc,
    signInGoogleFunc,
    signOutFunc,
    updateProfileFunc,
    logInFunc,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
