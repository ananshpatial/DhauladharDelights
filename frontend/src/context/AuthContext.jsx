import React, { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("dd_user") || "null"));

  const persistUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem("dd_user", JSON.stringify(nextUser));
  };

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    persistUser(data);
    toast.success(`Welcome back, ${data.name}`);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistUser(data);
    toast.success("Account created successfully");
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dd_user");
    toast.success("Logged out");
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
