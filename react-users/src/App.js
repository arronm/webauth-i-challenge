import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Users from './Users';
import AuthForm from './AuthForm';

const App = () => {
  const [state, setState] = useState({
    users: [],
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
  }, []);

  const handleLogin = async (credentials) => {
    // handle login
    try {
      const response = await axios.post('http://localhost:4444/api/auth/login', credentials, { withCredentials: true });
      
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

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:4444/api/auth/logout');
      if (response) {
        localStorage.removeItem('user');
        setState({
          users: [],
          loggedIn: false,
        });
      } else {
        console.log('You should not hit this, ever (in theory)');
      }
    } catch (error) {
      console.log('error :', error);
    }
  }

  const getUsers = async () => {
   try {
    const { data: users } = await axios.get('http://localhost:4444/api/users', {
      withCredentials: true,
    });

    if (users) {
      setState({
        ...state,
        users,
      });
    }
   } catch (error) {
     console.log('error :', error);
   }
  }

  return (
    <div className="App">
      <nav className="navigation">
        {
          !state.loggedIn
            ? <span></span>
            : <span onClick={handleLogout}>Log Out</span>
        }
      </nav>
      <header className="App-header">
        {
          !state.loggedIn
            ? <AuthForm handleLogin={handleLogin} />
            : <Users getUsers={getUsers} users={state.users} />
        }
      </header>
    </div>
  );
}

export default App;
