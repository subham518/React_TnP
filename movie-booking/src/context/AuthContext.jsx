import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("moviestack_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedUsers = localStorage.getItem("moviestack_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const register = (name, email, password) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }
    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("moviestack_users", JSON.stringify(updatedUsers));
    return { success: true };
  };

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }
    const userData = { name: foundUser.name, email: foundUser.email };
    setUser(userData);
    localStorage.setItem("moviestack_user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("moviestack_user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}