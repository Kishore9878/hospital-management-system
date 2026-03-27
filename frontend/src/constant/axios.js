import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3636/api",
  withCredentials: true,
});
