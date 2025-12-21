import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingNav from "./components/FloatingNav";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <HomePage />
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
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold">History Page</h2>
                  <p className="text-muted-foreground mt-2">Your resume analysis history will be displayed here.</p>
                </div>
                <FloatingNav />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold">Profile Page</h2>
                  <p className="text-muted-foreground mt-2">Your profile information will be displayed here.</p>
                </div>
                <FloatingNav />
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
