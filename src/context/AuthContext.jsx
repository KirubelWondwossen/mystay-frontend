import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEYS = {
  admin: "admin_token",
  manager: "manager_token",
};

const USER_KEYS = {
  admin: "admin_user",
  manager: "manager_user",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem(TOKEN_KEYS.admin);
    const managerToken = localStorage.getItem(TOKEN_KEYS.manager);

    if (adminToken) {
      setToken(adminToken);
      setUser(JSON.parse(localStorage.getItem(USER_KEYS.admin)));
      setIsAuthenticated(true);
      return;
    }

    if (managerToken) {
      setToken(managerToken);
      setUser(JSON.parse(localStorage.getItem(USER_KEYS.manager)));
      setIsAuthenticated(true);
      return;
    }

    setIsAuthenticated(false);
  }, []);

  const login = (data, role) => {
    let userData = null;

    if (role === "admin") {
      userData = {
        id: data.admin_id,
        name: data.admin_name,
        email: data.admin_email,
        role: "admin",
      };
    }

    if (role === "manager") {
      userData = {
        id: data.manager_id,
        name: data.manager_name,
        email: data.manager_email,
        role: "manager",
      };
    }

    localStorage.setItem(TOKEN_KEYS[role], data.access_token);
    localStorage.setItem(USER_KEYS[role], JSON.stringify(userData));

    setToken(data.access_token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (user?.role) {
      localStorage.removeItem(TOKEN_KEYS[user.role]);
      localStorage.removeItem(USER_KEYS[user.role]);
    }

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useAuth = () => useContext(AuthContext);
