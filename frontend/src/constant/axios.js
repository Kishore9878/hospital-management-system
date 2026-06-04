import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://hospital-management-system-ebhn.onrender.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
