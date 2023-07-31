import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebase-config";

export default function useUser() {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      setUserData(data._tokenResponse);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        data._tokenResponse
      );

      setIsAdmin(response.data.isAdmin);

      return response.data;
    } catch (err) {
      setUserData(null);
      if (err.response && err.response.status === 401) {
        throw new Error("Unauthorized: Please check your login details");
      }

      if (err.response && err.response.status === 500) {
        throw new Error("Server error: Please try again later");
      }

      throw new Error("An error occurred: Please try again");
    }
  }

  useEffect(() => {
    const authenticate = getAuth();

    onAuthStateChanged(authenticate, user => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  return { userData, userEmail, isAdmin, handleGoogleLogin };
}
