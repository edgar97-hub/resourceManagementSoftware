  
import React, { useEffect } from 'react';
import './App.css';
import {Home,Calendar,HumanTalentManagement} from "./pages";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/ForgotPassword";
import Setting from "./pages/setting/Setting";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
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

  const ExtraPath = ({ children }) => {
    return  <Navigate      
    to={{
      pathname: "/test/OrgChart.html",
    }}
     />;
  };

  const RequireAuth = ({ children }) => {
    console.log("currentUser: "+currentUser);
    return currentUser ? children : <Navigate to="/login" />;
  };


  class Orgchart extends React.Component {
    render() {
      return (
        <div>
           <meta http-equiv="Refresh" content="0; url=http://127.0.0.1:3000/test/OrgChart.html" />
        </div>);

    }
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />}/>
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route index element={<RequireAuth> <Home /> </RequireAuth>}/>
            <Route path="/setting" element={<RequireAuth> <Setting /> </RequireAuth>}/>
            <Route exact path="/org-chart" element={<RequireAuth> <Orgchart /> </RequireAuth>}/>
            <Route path="/calendar" element={<RequireAuth> <Calendar /> </RequireAuth>}/>
            <Route path="/human-talent-management" element={<RequireAuth> <HumanTalentManagement /> </RequireAuth>}/>

          </Route>
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
 