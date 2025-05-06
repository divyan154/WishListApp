// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // your backend URL
});

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
