import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "@/views/header/Header";
import ResourceForm from "@/views/forms/ResourceForm";
import ResourceList from "@/views/resource-list/ResourceList";
import ResourceVersionList from "@/views/resource-version-list/ResourceVersionList";
import LandingPage from "@/views/landing-page/LandingPage";
import ErrorView from "@/views/ErrorView";
import useAuthState from "@/hooks/useAuthState";

function App() {
  useAuthState();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/initial-resource-form" element={<ResourceForm />} />
        <Route path="/new-resource-form" element={<ResourceForm />} />
        <Route
          path="/resource-list/:currentCategoryPath"
          element={<ResourceList />}
        />
        <Route path="/new-resource-version-form" element={<ResourceForm />} />
        <Route
          path="/resource-version-list"
          element={<ResourceVersionList />}
        />
        <Route path="/error" element={<ErrorView />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
