/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import {
    Users, Calendar, Clock,
    Menu,
    LogOut,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCard from "@/components/comp/StatsCard";
import { axiosInstance } from "@/constant/axios";
import { Button } from "@/components/ui/button";
import Profile from "@/components/comp/Profile";
import Sidebar from "./Sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { logoutUser } from "@/redux/slices/userSlice";
import { useDispatch, } from "react-redux";
import { toast } from "react-toastify";
import AppointmentCard from "./AppontmentCard";


function DoctorDashboard({ currentUser, sidebarOpen,
    setSidebarOpen,
    selectedLink,
    setSelectedLink }) {
    const [appointments, setAppointments] = useState([]);
    const [todaysAppointment, setTodaysAppointment] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);


    // console.log("appointments :", appointments);


    const dispatch = useDispatch()


    const loadData = useCallback(async () => {
        if (!currentUser) return;

        setLoading(true);

        try {
            const [appointmentsRes, todaysAppointmentRes, patientsRes] = await Promise.all([
                axiosInstance.get("/doctor/appointments"),
                axiosInstance.get("/doctor/todays/appointments"),
                axiosInstance.get("/doctor/patients"),
            ]);

            setAppointments(appointmentsRes?.data || []);
            setTodaysAppointment(todaysAppointmentRes?.data || []);
            // setPatients((patientsRes.data.patients || []).filter(p => p.role === 'patient'));
            setPatients(patientsRes?.data?.patients || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }

        setLoading(false);
    }, [currentUser]);

    useEffect(() => { loadData(); }, [loadData]);


    // get doctor's patient details 
    // const handlePatientClick = async (patientId) => {
    //     setSelectedPatient(patientId);
    //     try {
    //         const { data } = await axiosInstance.get(`/doctor/patient/${patientId}`);
    //         setPatientDetails(data);
    //     } catch (error) {
    //         console.error("Error fetching patient details:", error);
    //     }
    // };
    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
            // console.log("appointmentId, newStatus :", appointmentId, newStatus);

            const { data } = await axiosInstance.put(`/admin/${appointmentId}/status`, {
                status: newStatus
            });

            console.log("data:", data);
            if (data?.success) {
                toast.success("Status updated successfully");
                loadData()
            }
            // OR
            // if (data?.success) {
            //     // Update local state
            //     setAppointments(prev => ({
            //         ...prev,
            //         appointments: prev.appointments.map(apt =>
            //             apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            //         )
            //     }));

            //     setTodaysAppointment(prev => ({
            //         ...prev,
            //         todaysAppointments: prev.todaysAppointments?.map(apt =>
            //             apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            //         )
            //     }));

            //     toast.success("Status updated successfully");
            // }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };



    if (loading) return (
        <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
            </div>
        </div>
    );


    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Sidebar  */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
            />
            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64 ">
                {/* Top Navbar */}
                <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu />
                    </Button>
                    <h1 className="text-xl font-semibold capitalize">{selectedLink}</h1>
                    <div className="flex items-center gap-3">
                        <Popover>
                            <PopoverTrigger>
                                <ProfileImage user={currentUser} className="w-10 h-10" /></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <Button size="sm" variant="outline">
                                        <Link to={createPageUrl("Dashboard")}>Dashboard</Link>
                                    </Button>
                                    <Button onClick={() => dispatch(logoutUser())} size="sm" variant="outline" className=""><LogOut /> Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-800">
                                Dr. {currentUser?.fullName?.split(" ")[0] || "John"}
                            </p>
                            <p className="text-xs text-gray-500">{currentUser?.department}</p>
                        </div>
                    </div>

                </header>
                {selectedLink === "dashboard" &&
                    <div className="p-6 space-y-8">
                        {/* Header */}
                        <div>
                            <h1 className="text-3xl  font-bold text-gray-900 mb-2">
                                Hii, Dr. {currentUser?.fullName?.split(" ")[0]}!
                            </h1>
                            <p className="text-gray-500">
                                {currentUser?.department && `${currentUser.department} • `}
                                You have {todaysAppointment?.todaysAppointments?.count || 0} appointments today
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatsCard
                                title="Total Patients"
                                value={patients?.length || 0}
                                icon={Users}
                                color="blue"
                                trend="+12% this month"
                                trendUp={true}
                            />
                            <StatsCard
                                title="Today's Appointments"
                                value={appointments?.count || 0}
                                icon={Calendar}
                                color="green"
                            />
                            <StatsCard
                                title="Avg. Consultation Time"
                                value="32 min"
                                icon={Clock}
                                color="orange"
                            />
                        </div>

                        {/* Today's Schedule */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Today's Schedule</h2>
                            {todaysAppointment?.todaysAppointments?.length > 0 ? todaysAppointment?.todaysAppointments?.map((data) => (
                                <AppointmentCard key={data?._id} appointment={data} handleStatusUpdate={handleStatusUpdate} showPatient showDoctor />

                            ))
                                :

                                <div className="">
                                    <h3 className="font-semibold text-gray-900">
                                        There is no appointments of today
                                    </h3>
                                </div>

                            }
                        </div>
                    </div>}

                {
                    selectedLink === "appointments" && <div className=" p-6 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Hii, Dr. {currentUser?.fullName?.split(" ")[0]}!
                            </h1>
                            <p className="text-gray-500">
                                {currentUser?.department && `${currentUser.department} • `}
                                You have {appointments?.count} appointments
                            </p>
                        </div>
                        {/* Today's Schedule */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Today's Schedule</h2>
                            {appointments?.appointments?.map((data) => (
                                <AppointmentCard key={data?._id} appointment={data} handleStatusUpdate={handleStatusUpdate} showPatient showDoctor />

                            ))}
                        </div>
                    </div>
                }

                {selectedLink === "profile" &&
                    <div className=" p-6 space-y-8">
                        <Profile />
                    </div>
                }

            </main>
        </div>
    );
}

export default DoctorDashboard;