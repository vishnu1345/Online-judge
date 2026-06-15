import React from "react";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";


export default function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/problems"
              element={
                <ProtectedRoute>
                  <Problems />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/problems/:id"
              element={
                <ProtectedRoute>
                  <ProblemDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
};