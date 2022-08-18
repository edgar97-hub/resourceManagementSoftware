 
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from "./contexts/AuthContext";
import { DarkModeContextProvider } from "./contexts/darkModeContext";
import { ContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
  <DarkModeContextProvider>
  <AuthContextProvider> 
    <ContextProvider>
    <App />
    </ContextProvider>
  </AuthContextProvider>
</DarkModeContextProvider>,
  document.getElementById('root'),
);

