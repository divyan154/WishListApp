// lib/api.ts
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL|| "http://localhost:3001";
const api = axios.create({
  baseURL: baseUrl, // your backend URL
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
