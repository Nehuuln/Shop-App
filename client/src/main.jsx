import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from'react-router-dom';
import { GoogleOAuthProvider} from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId="1042270187513-cglsqtokpl2clvrni7ngt5bbqbho11o9.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>,
)
