import { useEffect, useState } from "react";
import CreateUser from "../@/components/CreateUser";
import { features } from "process";
import Index from "@/components/Users"; // Import the Index component

interface User {
  name: string;
  email: string;
  password: string;
}

export default function App(): any {
  const [users, setUsers] = useState<User[]>([]);
  const [num, setNum] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty array ensures that effect is only run on mount

  return (
    <div className="flex justify-center flex-col gap-12 ">
      <button onClick={() => setNum(num + 1)}> Plus </button>
      <h1>Number: {num}</h1>
      <div>
        <CreateUser fetchUsers={fetchUsers} />
      </div>
      <div className="">
        <Index users={users} />
      </div>
    </div>
  );
}
