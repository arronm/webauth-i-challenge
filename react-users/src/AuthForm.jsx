import React, { useState } from 'react';

const AuthForm = (props) => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleLogin(state);
  }

  return (
    <>
      <form className="AuthForm" onSubmit={handleOnSubmit}>
        <input name="username" type="text" value={state.username} onChange={handleOnChange} />
        <input name="password" type="password" value={state.password} onChange={handleOnChange} />
        <input type="submit" value="Login"/>
      </form>
    </>
  );
}
 
export default AuthForm;
