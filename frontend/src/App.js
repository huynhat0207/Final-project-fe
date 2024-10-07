
import React from "react"
import './App.css'
import { Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import { Box } from "@mui/material";
import Home from './components/HomePage.jsx'
import SignIn from "./components/Auth/SignIn.jsx"
import Signup from "./components/Auth/SignUp.jsx"
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"
import NotFound from "./components/NotFound.jsx"
import { AuthProvider } from "./components/Auth/AuthContext.js";
import Layout from "./components/Layout.jsx";
import Overview from "./components/WorkPlace/Overview.jsx"
import Dashboard from "./components/WorkPlace/Dashboard.jsx"
import RFMAnalysis from "./components/WorkPlace/RFMAnalysis.jsx"
import Support from "./components/WorkPlace/Support.jsx";
import Forecasting from "./components/WorkPlace/Forecasting.jsx";
import Chatbot from "./components/WorkPlace/Chatbot.jsx";
// import { deleteData } from "./components/Service/dataService.js";
import TestPage from "./components/TestPage.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Signup />
}
function App() {
  const mainList = [
    {id:0, path: '/overview', element: <Overview/> },
    {id:1, path: '/dashboard', element: <Dashboard/> },
    {id:2, path: '/rfm', element: <RFMAnalysis/> },
    {id:3, path: '/support', element: <Support/> },
    {id:4, path: '/forecast', element: <Forecasting/> },
    {id:4, path: '/chatbot', element: <Chatbot/> },
  ];
  return (
    <AuthProvider>
      <Box className="w-screen bg-slate-200 overflow-y-auto">
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
          <Route element={<Layout/>}>
            <Route path="/home" element={<Home />} />
            {/* Protected routes */}
            {mainList.map((item) => <Route key={item.id} path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />)}
            <Route path="/test" element={<TestPage />} />
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App