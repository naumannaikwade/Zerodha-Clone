import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FundsProvider } from "./context/FundsContext";
import { StockProvider } from "./context/StockContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FundsProvider>
          <StockProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </StockProvider>
        </FundsProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;