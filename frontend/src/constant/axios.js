import axios from "axios";

// Use production URL or local for development
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const baseURL = isProduction 
  ? "https://hospital-management-system-l3d2tdvh6-hospital2.vercel.app/api"
  : "http://localhost:3060/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
