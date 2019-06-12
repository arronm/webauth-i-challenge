import React, { useEffect } from 'react';

const Users = (props) => {
  const { users, getUsers } = props;
  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, [users, getUsers]);
  return props.users.map(user => <div key={users.id || 0}>{user.username}</div>)
}
 
export default Users;
