import React from "react";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";


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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
};