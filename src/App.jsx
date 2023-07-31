// import { useState } from "react";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import UserContext from "../contexts/UserContext";
// import useUser from "../hooks/useUser";
import Header from "./components/Header";
import Login from "./components/Login";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";
import { InitialResponseProvider } from "../contexts/InitialResponseContext";
import { auth } from "../config/firebase-config";

function App() {
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

  const value = useMemo(
    () => ({
      userData,
      userEmail,
      isAdmin,
      handleGoogleLogin,
    }),
    [userData, userEmail, isAdmin]
  );

  return (
    <UserContext.Provider value={value}>
      <div className="relative bg-gradient-to-b from-stone-300 via-stone-300 to-black">
        <Header />
        <main className="flex items-center justify-center h-screen">
          <InitialResponseProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/new-resource-form" element={<ResourceForm />} />
              <Route
                path="/resource-list/:category"
                element={<ResourceList />}
              />
            </Routes>
          </InitialResponseProvider>
        </main>
        <Toaster />
      </div>
    </UserContext.Provider>
  );
}

export default App;
