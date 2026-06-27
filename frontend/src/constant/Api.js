// export const backendApi = "https://hospital-web-backend.vercel.app"; // vercel
// export const backendApi = "https://hospital-web-backend.onrender.com"; // render
// export const backendApi = "http://localhost:3060"; // local

export const backendApi =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/api\/v1$/, "") ||
  "https://hospital-management-system-8oc0.onrender.com";