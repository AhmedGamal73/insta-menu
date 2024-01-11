import { createContext, useState, useEffect, useContext } from "react";
import { User } from "../../pages/dashboard/tables/columns";
const AppContext = createContext({});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [users, setUsers] = useState<User[]>([]);

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
  }, []);

  return (
    <AppContext.Provider value={() => fetchUsers()}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
