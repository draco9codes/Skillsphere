import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Journey from "./pages/journey/Journey";
import LandingPage from "./pages/landingPage/LandingPage";
import NavBar from "./pages/navBar/NavBar";
import { AuthProvider } from "./routes/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  // 1) This flag controls the NavBar modal
  const [showLoginComponent, setShowLoginComponent] = useState(false);

  // 2) This stores the protected path user tried to open (e.g. "/journey")
  const [afterLoginPath, setAfterLoginPath] = useState<string>("/home");

  // 3) “Safe” path to show behind the modal when blocked
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

            <Route path="/home" element={<LandingPage />} />
            <Route path="/discover" element={<LandingPage />} />
            <Route path="/rooms" element={<LandingPage />} />
            <Route path="/projects" element={<LandingPage />} />

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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
