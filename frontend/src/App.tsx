import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import NavBar from "./pages/navBar/NavBar";

function App() {
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<LandingPage />} />
            <Route path="/discover" element={<LandingPage />} />
            <Route path="/journey" element={<LandingPage />} />
            <Route path="/rooms" element={<LandingPage />} />
            <Route path="/projects" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
