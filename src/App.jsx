import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebase-config";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      setUserData(data._tokenResponse);

      const response = await axios.post(
        "http://localhost:3000/login",
        data._tokenResponse
      );

      if (response.data.result !== "ok") {
        navigate("/login");
        return; // eslint-disable-line no-useless-return
      }

      navigate(response.data.isUser ? "/logo-dashboard" : "/initial-setup");
    } catch (err) {
      navigate("/login");
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

  return (
    <div className="relative bg-gradient-to-b from-stone-300 via-stone-300 to-black">
      <Header />
      <main className="flex items-center justify-center h-screen">
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                handleGoogleLogin={handleGoogleLogin}
                userData={userData}
                userEmail={userEmail}
              />
            }
          />
          <Route path="/initial-setup" />
          <Route path="/logo-dashboard" />
        </Routes>
      </main>
    </div>
  );
}

export default App;
