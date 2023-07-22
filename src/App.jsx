import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const { userData, userEmail, handleGoogleLogin } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleLogin() {
    try {
      const data = await handleGoogleLogin();
      if (data.result !== "ok") {
        setError("Login failed. Please try again.");
        navigate("/login");
      } else {
        navigate(data.isUser ? "/logo-dashboard" : "/initial-setup");
      }
    } catch (err) {
      setError(err.message);
      navigate("/login");
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-stone-300 via-stone-300 to-black">
      <Header />
      <main className="flex items-center justify-center h-screen">
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                handleGoogleLogin={handleLogin}
                userData={userData}
                userEmail={userEmail}
                error={error}
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
