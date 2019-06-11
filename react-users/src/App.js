import React, { useState, useEffect } from 'react';
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

  const handleLogin = (credentials) => {
    // handle login
    console.log('creds', credentials);
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
