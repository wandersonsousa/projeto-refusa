import React, { useState, useEffect, useContext, createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Router from "next/router";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import firebaseHelper from "./firebase_helper";
const authContext = createContext({});

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseHelper.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        if (Router.pathname !== "/signup") Router.push("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const register = (email, password, username) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(async (authuserr) => {
        await updateProfile(getAuth().currentUser, {
          displayName: username,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/twitter-clone-6d3a7.appspot.com/o/ProfilePic%2Fdefault.png?alt=media",
        });
        await addDoc(collection(firebaseHelper.db, "profiles"), {
          id: authuserr.user.uid,
          username: username,
          name: username,
          email: email,
          bio: "Bio não encontrada",
          timestamp: Timestamp.fromDate(new Date()),
          profileimage:
            "https://firebasestorage.googleapis.com/v0/b/twitter-clone-6d3a7.appspot.com/o/ProfilePic%2Fdefault.png?alt=media",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage(errorMessage);
        console.log(errorMessage);
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(getAuth(), email, password).catch((error) => {
      const errorMessage = error.message;
      seterrorMessage(errorMessage);
      console.log(errorMessage);
    });
  };

  const logout = () => {
    firebaseHelper.auth.signOut();
    Router.push("/");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    errorMessage,
  };
}

export function AuthProvider({ children }) {
  const authuser = useFirebaseAuth();

  return (
    <authContext.Provider value={authuser}>{children}</authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
