import React, { useEffect } from 'react';

import './App.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Setting from "./pages/setting/Setting";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./contexts/darkModeContext";
import { AuthContext } from "./contexts/AuthContext";
import { useStateContext } from './contexts/ContextProvider';

function App() {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);




  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    console.log("currentUser: "+currentUser);
    return currentUser ? children : <Navigate to="/login" />;
  };


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth> <Home /> </RequireAuth>}/>
            <Route path="/setting" element={<RequireAuth> <Setting /> </RequireAuth>}/>

            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
