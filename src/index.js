import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./contexts/AuthContext";
import { DarkModeContextProvider } from "./contexts/darkModeContext";
import { ContextProvider } from './contexts/ContextProvider';
import Demo2 from "./Demo2";
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#fff"
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <DarkModeContextProvider>
      <AuthContextProvider> 
        <ContextProvider>
        <App />
        </ContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
