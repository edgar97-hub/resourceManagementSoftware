import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./contexts/AuthContext";
import { DarkModeContextProvider } from "./contexts/darkModeContext";
import { ContextProvider } from './contexts/ContextProvider';

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
