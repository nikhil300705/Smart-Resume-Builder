import React, { createContext, useContext, useState } from "react";
import { authAPI } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const register = async (name, email, password) => {

    try {

      const res = await authAPI.register({
        name,
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      setUser(res.data.user);

      return { success: true };

    } catch (error) {

      return {
        success: false,
        error: error.response?.data?.message || "Registration failed"
      };

    }

  };

  const login = async (email, password) => {

    try {

      const res = await authAPI.login({
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      setUser(res.data.user);

      return { success: true };

    } catch (error) {

      return {
        success: false,
        error: error.response?.data?.message || "Login failed"
      };

    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};