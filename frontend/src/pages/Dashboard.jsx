
import DoctorDashboard from "@/components/comp/DoctorDashboard";
import UserDashboard from "@/components/comp/UserDashboard";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { user: currentUser, loading: isLoading } = useSelector(
        (state) => state.user
    );

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState("dashboard");

    if (!currentUser) return null; // Guard clause

    const role = currentUser?.role;


    if (role === "doctor") {
        return (
            <DoctorDashboard
                currentUser={currentUser}
                isLoading={isLoading}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
            />
        );
    }

    return (
        <UserDashboard
            currentUser={currentUser}
            isLoading={isLoading}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
        />
    );
};

export default Dashboard;
