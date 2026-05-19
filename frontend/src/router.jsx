import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ApplicationTracker from "./pages/ApplicationTracker.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import InterviewPrep from "./pages/InterviewPrep.jsx";
import JobMatch from "./pages/JobMatch.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ResumeAnalysis from "./pages/ResumeAnalysis.jsx";
import ResumeUpload from "./pages/ResumeUpload.jsx";
import Signup from "./pages/Signup.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> }
    ]
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "resume-upload", element: <ResumeUpload /> },
      { path: "resume-analysis", element: <ResumeAnalysis /> },
      { path: "job-match", element: <JobMatch /> },
      { path: "interview-prep", element: <InterviewPrep /> },
      { path: "applications", element: <ApplicationTracker /> },
      { path: "profile", element: <Profile /> }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
