import React from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

interface IndexProps {
  users: User[];
}

const Users: React.FC<IndexProps> = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      {users && users.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;