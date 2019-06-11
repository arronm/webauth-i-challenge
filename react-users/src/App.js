import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Users from './Users';
import AuthForm from './AuthForm';

const App = () => {
  const [state, setState] = useState({
    users: {},
    loggedIn: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('user') || false;
    
    if (user) {
      setState({
        ...state,
        loggedIn: true,
      });
    }
  }, [state]);

  const handleLogin = async (credentials) => {
    // handle login
    try {
      const response = await axios.post('http://localhost:4444/api/auth/login', credentials);
      
      if (response) {
        localStorage.setItem('user', credentials.username);
        setState({
          ...state,
          loggedIn: true,
        });
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          !state.loggedIn
            ? <AuthForm handleLogin={handleLogin} />
            : <span>Kgo</span>
        }
      </header>
    </div>
  );
}

export default App;
