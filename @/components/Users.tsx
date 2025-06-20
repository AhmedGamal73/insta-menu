import React from "react";
import Link from "next/link";

interface User {
  _id: string;
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
      {users &&
        users.map((user, index) => (
          <div key={index}>
            <Link href={`/users/${encodeURIComponent(user._id)}`}>
              <h2>{user.name}</h2>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Users;
