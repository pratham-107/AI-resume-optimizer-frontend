import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Upload from "./pages/Upload";
import AnalysisPage from "./pages/AnalysisPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingNav from "./components/FloatingNav";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Protected routes */}
          <Route path="/" element={
            <>
              <LandingPage />
              <FloatingNav />
            </>
          } />

          {/* Protected routes */}

          {/* Protected routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <>
                  <Upload />
                  <FloatingNav />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analysis/:id"
            element={
              <ProtectedRoute>
                <>
                  <AnalysisPage />
                  <FloatingNav />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <>
                  <History />
                  <FloatingNav />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <>
                  <Profile />
                  <FloatingNav />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cover-letter/:id"
            element={
              <ProtectedRoute>
                <>
                  <CoverLetterPage />
                  <FloatingNav />
                </>
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

