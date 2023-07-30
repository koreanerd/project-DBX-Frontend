// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser";
import UserContext from "../contexts/UserContext";
import Header from "./components/Header";
import Login from "./components/Login";
import ResourceForm from "./components/ResourceForm";
import ResourceList from "./components/ResourceList";
import { InitialResponseProvider } from "../contexts/InitialResponseContext";

function App() {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
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
