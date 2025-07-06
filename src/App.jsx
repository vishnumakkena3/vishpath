import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Chatbot from "./components/Chatbot";
import CareerAssessment from "./pages/CareerAssessment"; // Import the Career Assessment component
import ResumeBuilder from "./pages/ResumeBuilder";
import Roadmaps from "./pages/Roadmaps";
import SkillsDevelopment from "./pages/SkillsDevelopment";
import InterviewBot from "./pages/InterviewBot";
import { useEffect } from "react";
const ScrollToTop = () => {
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname]);
  return null;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/chatbot" element={
              <ProtectedRoute>
                <Chatbot/>
              </ProtectedRoute>
            }
            /><Route
              path="/career-assessment"
              element={
                <ProtectedRoute>
                  <CareerAssessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
              
              />
            <Route
              path="/roadmaps"
              element={
                <ProtectedRoute>
                  <Roadmaps />
                </ProtectedRoute>
              }
              
            />
            <Route
              path="/skills-development"
              element={
                <ProtectedRoute>
                  <SkillsDevelopment />
                </ProtectedRoute>
              }
              
              />
            <Route path="/interview-prep"
              element={
                <ProtectedRoute>
                  <InterviewBot />
                </ProtectedRoute>
              }
              />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;