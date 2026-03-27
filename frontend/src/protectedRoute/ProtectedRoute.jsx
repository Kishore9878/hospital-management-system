// /* eslint-disable react/prop-types */
// import { Navigate } from "react-router-dom";
// import Loading from "@/components/comp/Loading";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const { user: currentUser, loading, isAuthenticated } = useSelector((state) => state.user);
//   // const isAuthenticated = !!currentUser?.user;
//   console.log("currentUser :", currentUser);


//   if (loading) return <Loading />;

//   if (!isAuthenticated && !currentUser?.user) return <Navigate to="/login" replace />;

//   return children;
// };

// export default ProtectedRoute;

/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "@/components/comp/Loading";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user: currentUser, loading, isAuthenticated } = useSelector((state) => state.user);

  // While checking authentication
  if (loading) return <Loading />;

  // If not logged in → redirect
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  // No login → redirect

  // If route requires specific roles (like Admin/Doctor)
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

