import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Journey from "./pages/journey/Journey";
import LandingPage from "./pages/landingPage/LandingPage";
import NavBar from "./pages/navBar/NavBar";
import SkillTreeDetailPage from "./pages/skillTree/SkillTreeDetailPage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import { AuthProvider } from "./routes/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ColorPreview from "./pages/ColorPreview";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";

function App() {
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const [afterLoginPath, setAfterLoginPath] = useState<string>("/home");
  const navBarPathName = "/home";

  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <NavBar
            showLoginComponent={showLoginComponent}
            setShowLoginComponent={setShowLoginComponent}
            afterLoginPath={afterLoginPath}
            setAfterLoginPath={setAfterLoginPath}
          />

          <Routes>
            <Route path="/*" element={<Navigate to="/home" replace />} />

            {/* Temporary routes for testing */}
            <Route path="/color-preview" element={<ColorPreview />} />

            {/* Public routes */}
            <Route path="/home" element={<LandingPage />} />
            <Route path="/rooms" element={<LandingPage />} />

            {/* ⭐ Projects - PUBLIC but personalized when logged in */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />

            {/* Protected routes wrapper */}
            <Route
              element={
                <ProtectedRoute
                  navBarPathName={navBarPathName}
                  setShowLoginComponent={setShowLoginComponent}
                  setAfterLoginPath={setAfterLoginPath}
                />
              }
            >
              <Route path="/journey" element={<Journey />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/tree/:treeId" element={<SkillTreeDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
