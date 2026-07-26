import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import Income from "./pages/Income/Income";
import Analytics from "./pages/Analytics/Analytics";
import Budgets from "./pages/Budgets/Budgets";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Reports from "./pages/Reports/Reports";

import ProtectedRoute from "./routes/ProtectedRoute";

import { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
);

useEffect(() => {
    if (darkMode) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
}, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Pages */}
        <Route 
          path="/dashboard"
          element={
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
              <ProtectedRoute>
                  <Expenses />
              </ProtectedRoute>
          }
      />
        <Route
            path="/income"
            element={
                <ProtectedRoute>
                    <Income />
                </ProtectedRoute>
            }
        />
        <Route
            path="/analytics"
            element={
                <ProtectedRoute>
                    <Analytics />
                </ProtectedRoute>
            }
        />
        <Route
            path="/budgets"
            element={
                <ProtectedRoute>
                    <Budgets />
                </ProtectedRoute>
            }
        />
        <Route
          path="/reports"
          element={
              <ProtectedRoute>
                  <Reports />
              </ProtectedRoute>
          }
      />

        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />
        <Route
            path="/settings"
            element={
                <ProtectedRoute>
                    <Settings
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </ProtectedRoute>
            }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;