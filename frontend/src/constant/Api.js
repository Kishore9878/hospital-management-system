// export const backendApi = "https://hospital-web-backend.vercel.app"; // vercel
// export const backendApi = "https://hospital-web-backend.onrender.com"; // render
// export const backendApi = "http://localhost:3060"; // local

export const backendApi = import.meta.env.VITE_BACKEND_URL 
  ? import.meta.env.VITE_BACKEND_URL.replace(/\/api$/, "") 
  : "https://hospital-management-system-ebhn.onrender.com";
