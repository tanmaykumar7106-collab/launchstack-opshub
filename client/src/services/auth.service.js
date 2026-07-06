import api from "../api/axios";

// Register
export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const login = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

// Current User
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};