import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser";
import UserContext from "../contexts/UserContext";
import Header from "./components/Header";
import Login from "./components/Login";
import ResourceForm from "./components/ResourceForm";

function App() {
  const user = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleLogin() {
    try {
      const data = await user.handleGoogleLogin();
      if (data.result !== "ok") {
        setError("Login failed. Please try again.");
        navigate("/login");
      } else {
        navigate(data.isUser ? "/logo-dashboard" : "/new-resource-form");
      }
    } catch (err) {
      setError(err.message);
      navigate("/login");
    }
  }

  return (
    <UserContext.Provider value={user}>
      <div className="relative bg-gradient-to-b from-stone-300 via-stone-300 to-black">
        <Header />
        <main className="flex items-center justify-center h-screen">
          <Routes>
            <Route
              path="/login"
              element={<Login handleGoogleLogin={handleLogin} error={error} />}
            />
            <Route path="/new-resource-form" element={<ResourceForm />} />
            <Route path="/logo-dashboard" />
          </Routes>
        </main>
        <Toaster />
      </div>
    </UserContext.Provider>
  );
}

export default App;
