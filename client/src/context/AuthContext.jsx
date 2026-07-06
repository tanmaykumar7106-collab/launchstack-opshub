import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  register as registerService,
  getMe,
} from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user on app start
  const loadUser = async () => {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (formData) => {
    const data = await loginService(formData);

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;
  };

  // Register
  const register = async (formData) => {
    const data = await registerService(formData);

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);