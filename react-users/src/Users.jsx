import React from 'react';

const Users = (props) => {
  return props.users.map(user => <div>{user.username}</div>)
}
 
export default Users;
