import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bp_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("bp_user", JSON.stringify(user));
  }, [user]);

  const login = (email) => {
    const newUser = { name: email.split("@")[0], email, balance: 10000, loans: [] };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
