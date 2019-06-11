import React, { useEffect } from 'react';

const Users = (props) => {
  useEffect(() => {
    if (!props.users.length) {
      props.getUsers();
    } else {
      console.log(props.users);
    }
  }, []);
  return props.users.map(user => <div>{user.username}</div>)
}
 
export default Users;
