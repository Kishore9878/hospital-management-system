/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Calendar, Clock, LogOut, Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import Sidebar from './Sidebar'
import Profile from './Profile'
import { format } from "date-fns";
import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '@/constant/axios';
import { Card, CardContent } from '../ui/card';
import StatsCard from './StatsCard';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import ProfileImage from './ProfileImage';
import { createPageUrl } from '@/utils';
import { logoutUser } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const UserDashboard = (
    { currentUser,
        sidebarOpen,
        setSidebarOpen,
        selectedLink,
        setSelectedLink }

) => {
    const [appointments, setAppointments] = useState([]);
    const [thisWeekAppointments, setThisWeekAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("appointments :", appointments);

    const dispatch = useDispatch()
    const loadData = useCallback(async () => {
        if (!currentUser) return;

        setLoading(true);

        try {
            const [appointmentsRes, thisWeekAppointmentsRes] = await Promise.all([
                axiosInstance.get("/user/my-appointments"),
                axiosInstance.get("/user/my-appointments/this-week"),

            ]);

            setAppointments(appointmentsRes?.data || []);
            setThisWeekAppointments(thisWeekAppointmentsRes?.data || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }

        setLoading(false);
    }, [currentUser]);

    useEffect(() => { loadData(); }, [loadData]);
    if (loading) return <Loader />
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Sidebar  */}
            <Sidebar
                currentUser={currentUser}
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
                                Mr. {currentUser?.fullName?.split(" ")[0] || "John"}
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
                                Hii, Mr. {currentUser?.fullName?.split(" ")[0]}!
                            </h1>
                            <p className="text-gray-500">
                                {currentUser?.department && `${currentUser.department} • `}
                                You have {thisWeekAppointments?.appointments?.count || 0} appointments of this week
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid w-full grid-cols-1 gap-6">
                            <StatsCard
                                title="Total Appointments"
                                value={appointments?.count || 0}
                                icon={Calendar}
                                color="green"
                            />

                        </div>

                        {/* This week Schedule */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Today's Schedule</h2>
                            {thisWeekAppointments?.appointments?.length > 0 ? thisWeekAppointments?.appointments?.map((data) => (
                                <Card
                                    key={data?._id}
                                    className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {data?.reason}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(data.date), "MMM dd, yyyy")}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                {/* {format(new Date(data?.time), "hh:mm a")} */}
                                                {(() => {
                                                    if (!data?.time) return "N/A";
                                                    const [hour, minute] = data.time.split(":").map(Number);
                                                    const ampm = hour >= 12 ? "PM" : "AM";
                                                    const formattedHour = hour % 12 || 12; // convert 0 -> 12, 13 -> 1
                                                    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
                                                })()}
                                            </div>
                                            {data.patient && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    Patient: {data?.patient?.user?.fullName}
                                                </div>
                                            )}
                                            {data.patient && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    Doctor: {data?.doctor?.user?.fullName}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end mt-3">
                                            <Button variant="outline" className="capitalize">{data.status}</Button>
                                        </div>
                                    </CardContent>
                                </Card>
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
                                Hii, Mr. {currentUser?.fullName?.split(" ")[0]}!
                            </h1>
                            <p className="text-gray-500">
                                {currentUser?.department && `${currentUser.department} • `}
                                You have {appointments?.count} appointments
                            </p>
                        </div>
                        {/* Today's Schedule */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">All Appointments</h2>
                            {appointments?.appointments?.map((data) => (
                                <Card
                                    key={data?._id}
                                    className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {data?.reason}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(data.date), "MMM dd, yyyy")}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                {(() => {
                                                    if (!data?.time) return "N/A";
                                                    const [hour, minute] = data.time.split(":").map(Number);
                                                    const ampm = hour >= 12 ? "PM" : "AM";
                                                    const formattedHour = hour % 12 || 12; // convert 0 -> 12, 13 -> 1
                                                    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
                                                })()}
                                            </div>
                                            {data.patient && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    Patient: {data?.patient?.user?.fullName}
                                                </div>
                                            )}
                                            {data.doctor && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User className="w-4 h-4" />
                                                    Dr. {data.doctor?.user?.fullName}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end mt-3">
                                            <Button variant="outline" className="capitalize">{data.status}</Button>
                                        </div>
                                    </CardContent>
                                </Card>
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
    )
}

export default UserDashboard