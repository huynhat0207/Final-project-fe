
import React from "react"
import './App.css'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from './components/HomePage.jsx'
import SignIn from "./components/Auth/SignIn.jsx"
import SignupForm from "./components/Auth/SignUp.jsx"

import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/NotFound.jsx"
import AppHeader from './features/dashboard/index.jsx';
// import Header from './components/Header/Header.jsx';
import { useState, useEffect } from 'react';
import User from './features/user/index.jsx'
import Profile from './features/user/profile/index.jsx'
import Languague from './features/user/language/index.jsx'
import Help from './features/user/help/index.jsx'
import Notification from './features/user/notification/index.jsx'
import Security from "./features/user/security/index.jsx";
import Edit from './features/user/edit/index.jsx'
import { AuthProvider } from "./components/Auth/AuthContext.js";
import Tutorial from "./features/tutorial/index.jsx";
import GetStarted from "./features/tutorial/getstarted/first/index.jsx";
import DescriptivePage from "./features/tutorial/analysis/descriptive/index.jsx";
import { Box } from "@mui/material";
import Layout from "./components/Layout.jsx";
import Overview from "./components/Dashboard/Overview.jsx"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <SignupForm />
}

function App() {

  const [excelData, setExcelData] = useState(null);
  const [pageLocation, setPageLocation] = useState('home')
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // execute on location change
    // setCount(count + 1);
    // console.log('Location changed!', location.pathname);
    if (location === '/home')
      setPageLocation('home');
    else setPageLocation('main');
  }, [location]);

  const mainList = [
    { path: '/overview', element: <Overview /> },
  ];
  const userList = [
    { path: 'profile', element: <Profile /> },
    { path: 'edit', element: <Edit /> },
    { path: 'notification', element: <Notification /> },
    { path: 'security', element: <Security /> },
    { path: 'language', element: <Languague /> },
    { path: 'help', element: <Help /> },
  ];
  const tutorialList = [
    { path: 'get-started', element: <GetStarted /> },
    { path: 'descriptive', element: <DescriptivePage /> },
  ];
  return (
    <AuthProvider>
      <Box className="w-screen">
      {/* <Header currentPage={pageLocation} />  */}
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
          <Route element={<Layout currentPage={pageLocation}/>}>
            <Route path="/home" element={<Home />} />
            {/* Protected routes */}
            <Route path="/calculate" element={<ProtectedRoute><AppHeader setExcelData={setExcelData} excelData={excelData} /></ProtectedRoute>} />
            {/* <Route path="/dashboard" element={<ProtectedRoute><MainPage/></ProtectedRoute>}/> */}
            {mainList.map((item) => <Route path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />)}

            <Route path="/user/*" element={<ProtectedRoute><User /></ProtectedRoute>}>
              <Route index element={<Profile />} />
              {userList.map((item) => <Route path={item.path} element={item.element} />)}
            </Route>
            <Route path="tutorial" element={<ProtectedRoute><Tutorial /></ProtectedRoute>}>
              <Route index element={<GetStarted />} />
              {tutorialList.map((item) => <Route path={item.path} element={item.element} />)}
            </Route>
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App