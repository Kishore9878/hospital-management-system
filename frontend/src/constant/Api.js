// Use production URL or local for development
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
export const backendApi = isProduction 
  ? "https://hospital-management-system-l3d2tdvh6-hospital2.vercel.app" 
  : "http://localhost:3060";
