/* eslint-disable react/no-unescaped-entities */
import AppointmentCard from '@/components/comp/AppontmentCard';
import Modal from '@/components/comp/Modal';
import Profile from '@/components/comp/Profile';
import ProfileImage from '@/components/comp/ProfileImage';
import Sidebar from '@/components/comp/Sidebar';
import StatsCard from '@/components/comp/StatsCard';
import UserCard from '@/components/comp/UserCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { axiosInstance } from '@/constant/axios';
import { logoutUser } from '@/redux/slices/userSlice';
import { createPageUrl } from '@/utils';
import { Calendar, Clock, LogOut, Menu, Users, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user: currentUserAdmin, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allData, setallData] = useState([]);
    const [selectedLink, setSelectedLink] = useState("dashboard");
    console.log("currentUserAdmin:", currentUserAdmin);
    const [loading, setLoading] = useState(false)
    const [userDetail, setUserDetail] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    const [selectedModal, setSelectedModal] = useState(null);

    const patients = allData?.patients?.filter(
        (patient) => patient?.user?._id !== currentUserAdmin?._id
    );
    // const openDetailModal = (id) => {
    //     const patient = patients?.find((d) => d._id === id);
    //     setUserDetail(patient);
    //     setSelectedModal("detail");
    // };

    const openDetailModal = (id) => {
        const allUsers = [
            ...(allData?.patients || []),
            ...(allData?.doctors || [])
        ];

        const selected = allUsers.find((u) => u._id === id);

        if (!selected) return;

        setUserDetail(selected);
        setSelectedModal("detail");
    };



    const closeModal = () => {
        setSelectedModal(null);
        setUserDetail(null);
    };

    const getAllData = async () => {


        // dispatch(updateUserProfile(profileData))
        setLoading(true)
        try {
            const { data } = await axiosInstance.get('/admin/all')

            setallData(data)
        } catch (error) {
            console.log("Error with updating profile", error);

        } finally {
            setLoading(false)
        }

    }


    useEffect(() => {
        getAllData()
    }, [])
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* Sidebar  */}
            <Sidebar
                currentUser={currentUserAdmin}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
            />
            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64 ">
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
                                <ProfileImage user={currentUserAdmin} className="w-10 h-10" /></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <Button size="sm" variant="outline">
                                        <Link to={createPageUrl("AdminDashboard")}>Dashboard</Link>
                                    </Button>
                                    <Button onClick={() => dispatch(logoutUser())} size="sm" variant="outline" className=""><LogOut /> Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium capitalize text-gray-800">
                                {currentUserAdmin?.fullName?.split(" ")[0] || "John"}
                            </p>
                        </div>
                    </div>

                </header>
                {selectedLink === "dashboard" &&
                    <div className="p-6 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            <StatsCard
                                title="Total Patients"
                                value={allData?.totalPatients || 0}
                                icon={Users2}
                                color="blue"
                                trend="+12% this month"
                                trendUp={true}
                            />
                            <StatsCard
                                title="Total Doctors"
                                value={allData?.totalDoctors || 0}
                                icon={Users2}
                                color="blue"
                                trend="+12% this month"
                                trendUp={true}
                            />

                            <StatsCard
                                title="Total Appointments"
                                value={allData?.totalAppointments || 0}
                                icon={Calendar}
                                color="green"
                            />


                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">

                            <StatsCard
                                title="Today's Appointments"
                                value={allData?.totalTodayAppointments || 0}
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
                            {allData?.todaysAppointments?.length > 0 ? allData?.todaysAppointments?.map((data) => (
                                <AppointmentCard key={data?._id} appointment={data}
                                    // handleStatusUpdate={handleStatusUpdate} 
                                    showPatient showDoctor />

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
                                Hii, {currentUserAdmin?.fullName?.split(" ")[0]}!
                            </h1>
                            {allData?.totalAppointments > 0 && <p className="text-gray-500">
                                You have {allData?.totalAppointments || 0} appointments
                            </p>}
                        </div>
                        {/* Today's Schedule */}
                        <div className="space-y-4">
                            {allData?.appointments?.map((data) => (
                                <AppointmentCard key={data?._id} appointment={data}
                                    // handleStatusUpdate={handleStatusUpdate} 
                                    showPatient showDoctor />

                            ))}
                        </div>
                    </div>
                }

                {
                    selectedLink === "patients" && <div className="p-6 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                patients?.map(patient =>
                                    <UserCard key={patient?._id} user={patient} openDetailModal={openDetailModal} />
                                )

                            }
                        </div>
                    </div>
                }
                {
                    selectedLink === "doctors" && <div className="p-6 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                allData?.doctors?.map(doctors =>
                                    <UserCard key={doctors?._id} user={doctors} openDetailModal={openDetailModal} />
                                )

                            }
                        </div>
                    </div>
                }


                {selectedLink === "profile" &&
                    <div className=" p-6 space-y-8">
                        <Profile />
                    </div>
                }

                {selectedModal && userDetail && (
                    <Modal selectedPatient={selectedModal} setSelectedPatient={closeModal}>
                        {selectedModal === "detail" ? (
                            <div className="text-left space-y-6 bg-white ">

                                {/* GRID WRAPPER – no overflow here */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:h-[400px] h-[80vh] overflow-y-auto   no-scrollbar">

                                    {/* LEFT PROFILE – sticky */}
                                    <div className="md:col-span-1 md:sticky md:top-0 h-full flex flex-col items-center p-4 bg-gray-50 rounded-xl">

                                        <ProfileImage
                                            user={userDetail?.user}
                                            className="w-full h-full"
                                            letter={2}
                                            imageBg="black"
                                        />

                                        {userDetail?.user?.role === "doctor" && (
                                            <p className="text-xl text-secondary-green font-semibold mt-1 text-center">
                                                {userDetail.specialty}
                                            </p>
                                        )}

                                        <p className="text-sm text-gray-500 mt-2 text-center">
                                            {userDetail.description}
                                        </p>

                                        <h5 className="font-bold text-xl text-primary-blue my-2">
                                            {userDetail?.user?.role === 'doctor' ? 'Dr.' : 'Mr.'}{" "}
                                            {userDetail?.user?.fullName || userDetail.fullName}
                                        </h5>

                                        <p className="text-xs text-gray-400 mt-2">
                                            Joined: {new Date(userDetail?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* RIGHT SIDE – scrollable */}
                                    <div className="md:col-span-2 space-y-6 overflow-y-auto no-scrollbar pr-3 h-[400px]">

                                        <div>
                                            <h5 className="font-bold text-primary-blue mb-2">Address</h5>
                                            <p className="text-md text-gray-700">{userDetail?.address || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-primary-blue mb-2">Age</h5>
                                            <p className="text-md text-gray-700">{userDetail?.age || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-primary-blue mb-2">Blood Group</h5>
                                            <p className="text-md text-gray-700">{userDetail?.bloodGroup || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-primary-blue mb-2">Gender</h5>
                                            <p className="text-md text-gray-700">{userDetail?.gender || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-primary-blue mb-2">Phone</h5>
                                            <p className="text-md text-gray-700">{userDetail?.phone || 'N/A'}</p>
                                        </div>

                                        {userDetail?.user?.role === "doctor" && (
                                            <>
                                                <div>
                                                    <h5 className="font-bold text-primary-blue mb-2">Biography</h5>
                                                    <p className="text-md text-gray-700">{userDetail.bio || 'N/A'}</p>
                                                </div>

                                                <div>
                                                    <h5 className="font-bold text-primary-blue mb-2">Department</h5>
                                                    <p className="text-md text-gray-700">{userDetail.department || 'N/A'}</p>
                                                </div>

                                                <div>
                                                    <h5 className="font-bold text-primary-blue mb-2">Available Time</h5>
                                                    <p className="text-md text-gray-700">{userDetail.availableTimes || 'N/A'}</p>
                                                </div>

                                                <div>
                                                    <h5 className="font-bold text-primary-blue mb-2">Experience</h5>
                                                    <p className="text-md text-gray-700">
                                                        {userDetail?.experienceYears || 'N/A'}+ years
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="font-bold text-primary-blue mb-2">Qualifications</h5>
                                                    <p className="text-md text-gray-700">{userDetail.qualifications || 'N/A'}</p>
                                                </div>

                                                {Array.isArray(userDetail.availableDays) && (
                                                    <div className="pt-4 border-t">
                                                        <h5 className="font-bold text-primary-blue mb-2">
                                                            Available Days
                                                        </h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {userDetail.availableDays.map((day, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs">
                                                                    {day}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-left overflow-y-auto h-96 no-scrollbar">
                                <section className="bg-white">
                                    <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

                                    <Button
                                        onClick={() => setSelectedModal("detail")}
                                        variant="outline"
                                        className="bg-green-600"
                                    >
                                        ← Back to Profile
                                    </Button>
                                </section>
                            </div>
                        )}
                    </Modal>
                )}

            </main>
        </div>
    )
}

export default AdminDashboard