import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Restore auth on page refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // explicitly set false if no user
    }
  }, []);

  // LOGIN
  const login = (data) => {
    const userData = {
      id: data.admin_id,
      name: data.admin_name,
      email: data.admin_email,
      role: "admin",
    };

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(data.access_token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
