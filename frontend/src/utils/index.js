// src/utils/index.js
export function createPageUrl(pageName) {
  switch (pageName) {
    case "Appointments":
      return "/appointments";
    case "Login":
      return "/login";
    case "Services":
      return "/services";
    case "Doctors":
      return "/doctors";
    case "Dashboard":
      return "/dashboard";
    case "AdminDashboard":
      return "/dashboard/admin";
    case "Contact":
      return "/contact";
    default:
      return "/";
  }
}
