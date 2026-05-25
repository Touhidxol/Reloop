import { createContext, useContext, useState } from "react";
import { mockUser } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("resident");

  const login = (selectedRole) => {
    setRole(selectedRole);
    setUser({ ...mockUser, role: selectedRole });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
