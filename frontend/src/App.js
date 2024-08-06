
import React, { useState, useEffect } from "react"
import './App.css'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Box } from "@mui/material";
import Home from './components/HomePage.jsx'
import SignIn from "./components/Auth/SignIn.jsx"
import SignupForm from "./components/Auth/SignUp.jsx"
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"
import NotFound from "./components/NotFound.jsx"
import { AuthProvider } from "./components/Auth/AuthContext.js";
import Layout from "./components/Layout.jsx";
import Overview from "./components/WorkPlace/Overview.jsx"
import Dashboard from "./components/WorkPlace/Dashboard.jsx"
import RFMAnalysis from "./components/WorkPlace/RFMAnalysis.jsx"
// import TestPage from "./components/TestPage.jsx"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <SignupForm />
}

function App() {
  const mainList = [
    { path: '/overview', element: <Overview/> },
    { path: '/dashboard', element: <Dashboard/> },
    { path: '/rfm', element: <RFMAnalysis/> },
  ];
  return (
    <AuthProvider>
      <Box className="w-screen bg-slate-200">
      {/* <Header currentPage={pageLocation} />  */}
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
          <Route element={<Layout/>}>
            <Route path="/home" element={<Home />} />
            {/* Protected routes */}
            {mainList.map((item) => <Route path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />)}
            {/* <Route path="/test" element={<TestPage />} /> */}
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App