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
import UserContext from "@/contexts/UserContext";
import InitialContext from "@/contexts/InitialResponseContext";
import Header from "@/views/header/Header";
import Login from "@/views/landing-page/Login";
import InitialResourceForm from "@/views/forms/InitialResourceForm";
import ResourceList from "@/views/resource-list/ResourceList";
import { auth } from "@/config/firebase-config";
import ResourceVersionForm from "@/views/forms/ResourceVersionForm";
import ResourceForm from "@/views/forms/ResourceForm";
import ResourceVersionList from "@/views/resource-version-list/ResourceVersionList";

function App() {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoriesId, setCategoriesId] = useState([]);
  const [initialResponse, setInitialResponse] = useState(null);
  const [isInitialUser, setIsInitialUser] = useState(null);
  const authenticate = getAuth();

  function handleIsInitialuser(boolean) {
    setIsInitialUser(boolean);
  }

  async function userAuthenticate(token, email) {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/login`,
      { idToken: token, email, login: false },
      { headers: { "Content-Type": "application/json" } },
    );

    setIsAdmin(response.data.isAdmin);
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      setUserData(data._tokenResponse);
      setUserEmail(data.user.email);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        { email: userEmail, idToken: data._tokenResponse.idToken, login: true },
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
    onAuthStateChanged(authenticate, (user) => {
      if (user) {
        setUserEmail(user.email);
        const token = user.accessToken;

        if (token) {
          userAuthenticate(token, user.email);
        }
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      userData,
      userEmail,
      isAdmin,
      categoriesId,
      handleGoogleLogin,
    }),
    [userData, userEmail, isAdmin, categoriesId],
  );

  const initialValue = useMemo(
    () => ({
      initialResponse,
    }),
    [initialResponse],
  );

  return (
    <UserContext.Provider value={value}>
      <div className="relative bg-gradient-to-b from-stone-300 via-stone-300 to-black">
        <Header />
        <main className="flex items-center justify-center h-screen">
          <InitialContext.Provider value={initialValue}>
            <Routes>
              <Route
                path="/initial-resource-form"
                element={<InitialResourceForm />}
              />
              <Route path="/new-resource-form" element={<ResourceForm />} />
              <Route
                path="/"
                element={
                  <Login
                    setInitialResponse={setInitialResponse}
                    handleIsInitialuser={handleIsInitialuser}
                    isInitialUser={isInitialUser}
                  />
                }
              />
              <Route
                path="/resource-list/:category"
                element={<ResourceList setCategoriesId={setCategoriesId} />}
              />
              <Route
                path="/new-resource-version-form"
                element={<ResourceVersionForm />}
              />
              <Route
                path="/resource-version-list"
                element={<ResourceVersionList />}
              />
            </Routes>
          </InitialContext.Provider>
        </main>
        <Toaster />
      </div>
    </UserContext.Provider>
  );
}

export default App;
