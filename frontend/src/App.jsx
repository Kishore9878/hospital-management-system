import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import UpdateProfile from "./pages/user/UpdateProfile";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./redux/slices/userSlice";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Modal from "./pages/ReusableModal";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/modal",
    element: <Modal />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["doctor", "patient"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/update-profile",
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/doctors",
    element: <Doctors />,
  },
  {
    path: "/appointments",
    element: (
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  

  console.log("APP USER:", user);

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  return <RouterProvider router={router} />;
}

export default App;
