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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { axiosInstance } from '@/constant/axios';
import { logoutUser } from '@/redux/slices/userSlice';
import { createPageUrl } from '@/utils';
import { toast } from 'react-toastify';
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
    const [allData, setAllData] = useState([]);
    const [selectedLink, setSelectedLink] = useState("dashboard");
    console.log("currentUserAdmin:", currentUserAdmin);
    const [loading, setLoading] = useState(false)
    const [userDetail, setUserDetail] = useState(null);
    const [isCreateDoctorOpen, setIsCreateDoctorOpen] = useState(false);
    const [createRole, setCreateRole] = useState("doctor");
    const [newUser, setNewUser] = useState({
        fullName: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        address: "",
        phone: "",
        bloodGroup: "",
        department: "",
        qualifications: "",
        experienceYears: "",
        availableDays: "",
        availableTimes: "",
        description: "",
        bio: "",
    });
    // const [isLoading, setIsLoading] = useState(true);
    const [selectedModal, setSelectedModal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState(null);

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
        setIsEditing(false);
        setEditFields(null);
    };

    const openEditModal = (id) => {
        const allUsers = [
            ...(allData?.patients || []),
            ...(allData?.doctors || []),
        ];

        const selected = allUsers.find((u) => u._id === id);
        if (!selected) return;

        const role = selected?.user?.role || selected?.role;
        const initialFields = {
            fullName: selected?.user?.fullName || selected?.fullName || "",
            email: selected?.user?.email || selected?.email || "",
            gender: selected?.gender || "",
            bloodGroup: selected?.bloodGroup || "",
            phone: selected?.phone || "",
            age: selected?.age || "",
            address: selected?.address || "",
            department: selected?.department || "",
            qualifications: selected?.qualifications || "",
            experienceYears: selected?.experienceYears || "",
            availableDays: Array.isArray(selected?.availableDays)
                ? selected.availableDays.join(", ")
                : selected?.availableDays || "",
            availableTimes: selected?.availableTimes || "",
            description: selected?.description || "",
            bio: selected?.bio || "",
            role,
        };

        setUserDetail(selected);
        setSelectedModal("detail");
        setIsEditing(true);
        setEditFields(initialFields);
    };

    const closeModal = () => {
        setSelectedModal(null);
        setUserDetail(null);
        setIsEditing(false);
        setEditFields(null);
    };

    const getAllData = async () => {


        // dispatch(updateUserProfile(profileData))
        setLoading(true)
        try {
            const { data } = await axiosInstance.get('/admin/all')

            setAllData(data)
        } catch (error) {
            console.log("Error with updating profile", error);

        } finally {
            setLoading(false)
        }

    }

    const handleCreateFormChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const resetNewUser = () => {
        setNewUser({
            fullName: "",
            email: "",
            password: "",
            age: "",
            gender: "",
            address: "",
            phone: "",
            bloodGroup: "",
            department: "",
            qualifications: "",
            experienceYears: "",
            availableDays: "",
            availableTimes: "",
            description: "",
            bio: "",
        });
    };

    const handleCreateUser = async () => {
        if (!newUser.fullName || !newUser.email || !newUser.password || !newUser.age || !newUser.gender || !newUser.address || !newUser.phone) {
            toast.error("Please fill all required fields");
            return;
        }

        if (createRole === "doctor") {
            if (!newUser.department || !newUser.qualifications || !newUser.experienceYears || !newUser.availableDays || !newUser.availableTimes || !newUser.description) {
                toast.error("Please fill all required doctor fields");
                return;
            }
        }

        setLoading(true);
        try {
            const payload = {
                role: createRole,
                ...newUser,
            };

            if (createRole === "doctor") {
                payload.availableDays = newUser.availableDays
                    .split(",")
                    .map((d) => d.trim())
                    .filter(Boolean);
            }

            const response = await axiosInstance.post("/admin/create-user", payload);
            const createdData = response.data;

            if (!createdData?.success) {
                throw new Error(createdData?.message || `Could not create ${createRole}`);
            }

            toast.success(`${createRole.charAt(0).toUpperCase() + createRole.slice(1)} created successfully`);
            setIsCreateDoctorOpen(false);
            resetNewUser();

            if (createRole === "doctor" && createdData?.doctor) {
                setAllData((prev) => ({
                    ...prev,
                    doctors: [...(prev?.doctors || []), createdData.doctor],
                    totalDoctors: (prev?.totalDoctors || 0) + 1,
                }));
                setSelectedLink("doctors");
            }

            if (createRole === "patient" && createdData?.patient) {
                setAllData((prev) => ({
                    ...prev,
                    patients: [...(prev?.patients || []), createdData.patient],
                    totalPatients: (prev?.totalPatients || 0) + 1,
                }));
                setSelectedLink("patients");
            }
        } catch (error) {
            console.error("Create user error:", error.response?.data || error.message || error);
            toast.error(error.response?.data?.message || error.message || `Could not create ${createRole}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateUser = async () => {
        if (!editFields) return;
        setLoading(true);

        try {
            const userId = userDetail?.user?._id || userDetail?._id;
            const payload = {
                ...editFields,
            };

            if (userDetail?.user?.role === "doctor") {
                payload.availableDays = editFields.availableDays
                    .split(",")
                    .map((d) => d.trim())
                    .filter(Boolean);
            }

            const { data } = await axiosInstance.put(`/admin/profile/${userId}`, payload);

            if (!data?.success) {
                throw new Error(data?.message || "Update failed");
            }

            toast.success(data.message || "Updated successfully");
            setIsEditing(false);
            setUserDetail((prev) => ({ ...prev, ...data.profile }));

            setAllData((prev) => {
                if (!prev) return prev;
                const updatedProfile = data.profile;
                if (userDetail?.user?.role === "doctor") {
                    return {
                        ...prev,
                        doctors: prev.doctors?.map((item) =>
                            item._id === userDetail._id ? { ...item, ...updatedProfile } : item
                        ),
                    };
                }
                return {
                    ...prev,
                    patients: prev.patients?.map((item) =>
                        item._id === userDetail._id ? { ...item, ...updatedProfile } : item
                    ),
                };
            });
        } catch (error) {
            console.error("Update user error:", error.response?.data || error.message || error);
            toast.error(error.response?.data?.message || error.message || "Could not update user");
        } finally {
            setLoading(false);
        }
    };

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
                                    <UserCard key={patient?._id} user={patient} openDetailModal={openDetailModal} onEdit={openEditModal} />
                                )

                            }
                        </div>
                    </div>
                }
                {
                    selectedLink === "doctors" && <div className="p-6 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Doctors</h2>
                            <Button type="button" onClick={() => {
                                setCreateRole("doctor");
                                resetNewUser();
                                setIsCreateDoctorOpen(true);
                            }}>Add Doctor</Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                allData?.doctors?.map(doctors =>
                                    <UserCard key={doctors?._id} user={doctors} openDetailModal={openDetailModal} onEdit={openEditModal} />
                                )

                            }
                        </div>

                        <Modal selectedPatient={isCreateDoctorOpen} setSelectedPatient={() => setIsCreateDoctorOpen(false)} title="Create Doctor" close>
                            <div className="grid grid-cols-1 gap-4 p-4">
                                {[
                                    ["fullName", "Full Name"],
                                    ["email", "Email"],
                                    ["password", "Password"],
                                    ["department", "Department"],
                                    ["qualifications", "Qualifications"],
                                    ["experienceYears", "Experience Years"],
                                    ["phone", "Phone"],
                                    ["gender", "Gender"],
                                    ["age", "Age"],
                                    ["address", "Address"],
                                    ["availableDays", "Available Days (comma separated)"],
                                    ["availableTimes", "Available Times"],
                                    ["description", "Description"],
                                    ["bio", "Bio"],
                                ].map(([key, label]) => (
                                    <div key={key} className="grid grid-cols-1 gap-1">
                                        <Label htmlFor={key}>{label}</Label>
                                        <Input id={key} name={key} value={newUser[key]} onChange={handleCreateFormChange} />
                                    </div>
                                ))}
                                <Button type="button" onClick={handleCreateUser} className="mt-2">Create</Button>
                            </div>
                        </Modal>
                    </div>
                }

                {
                    selectedLink === "create" && <div className="p-6 space-y-8">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Create {createRole === "doctor" ? "Doctor" : "Patient"}</h2>
                                <p className="text-sm text-gray-600">Select a role and fill in the required details.</p>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant={createRole === "doctor" ? "default" : "outline"} onClick={() => {
                                    setCreateRole("doctor");
                                    resetNewUser();
                                }}>Doctor</Button>
                                <Button type="button" variant={createRole === "patient" ? "default" : "outline"} onClick={() => {
                                    setCreateRole("patient");
                                    resetNewUser();
                                }}>Patient</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-xl shadow-sm">
                            {[
                                ["fullName", "Full Name"],
                                ["email", "Email"],
                                ["password", "Password"],
                                ["age", "Age"],
                                ["gender", "Gender"],
                                ["address", "Address"],
                                ["phone", "Phone"],
                            ].map(([key, label]) => (
                                <div key={key} className="grid grid-cols-1 gap-1">
                                    <Label htmlFor={key}>{label}</Label>
                                    <Input id={key} name={key} value={newUser[key]} onChange={handleCreateFormChange} />
                                </div>
                            ))}

                            {createRole === "patient" && (
                                <div className="grid grid-cols-1 gap-1">
                                    <Label htmlFor="bloodGroup">Blood Group</Label>
                                    <Input id="bloodGroup" name="bloodGroup" value={newUser.bloodGroup} onChange={handleCreateFormChange} />
                                </div>
                            )}

                            {createRole === "doctor" && (
                                <>
                                    {[
                                        ["department", "Department"],
                                        ["qualifications", "Qualifications"],
                                        ["experienceYears", "Experience Years"],
                                        ["availableDays", "Available Days (comma separated)"],
                                        ["availableTimes", "Available Times"],
                                        ["description", "Description"],
                                        ["bio", "Bio"],
                                    ].map(([key, label]) => (
                                        <div key={key} className="grid grid-cols-1 gap-1">
                                            <Label htmlFor={key}>{label}</Label>
                                            <Input id={key} name={key} value={newUser[key]} onChange={handleCreateFormChange} />
                                        </div>
                                    ))}
                                </>
                            )}

                            <Button type="button" onClick={handleCreateUser} className="mt-2">Create {createRole === "doctor" ? "Doctor" : "Patient"}</Button>
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
                            isEditing ? (
                                <div className="text-left space-y-6 bg-white p-4 overflow-y-auto h-[80vh] no-scrollbar">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold">Edit {userDetail?.user?.role === 'doctor' ? 'Doctor' : 'Patient'}</h2>
                                            <p className="text-sm text-gray-600">Update the selected profile information.</p>
                                        </div>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            ["fullName", "Full Name"],
                                            ["email", "Email"],
                                            ["phone", "Phone"],
                                            ["age", "Age"],
                                            ["gender", "Gender"],
                                            ["address", "Address"],
                                            ["bloodGroup", "Blood Group"],
                                        ].map(([key, label]) => (
                                            <div key={key} className="grid gap-1">
                                                <Label htmlFor={key}>{label}</Label>
                                                <Input
                                                    id={key}
                                                    name={key}
                                                    value={editFields?.[key] || ''}
                                                    onChange={handleEditChange}
                                                />
                                            </div>
                                        ))}

                                        {userDetail?.user?.role === "doctor" && (
                                            <>
                                                {[
                                                    ["department", "Department"],
                                                    ["qualifications", "Qualifications"],
                                                    ["experienceYears", "Experience Years"],
                                                    ["availableDays", "Available Days (comma separated)"],
                                                    ["availableTimes", "Available Times"],
                                                    ["description", "Description"],
                                                    ["bio", "Bio"],
                                                ].map(([key, label]) => (
                                                    <div key={key} className="grid gap-1">
                                                        <Label htmlFor={key}>{label}</Label>
                                                        <Input
                                                            id={key}
                                                            name={key}
                                                            value={editFields?.[key] || ''}
                                                            onChange={handleEditChange}
                                                        />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="button" onClick={handleUpdateUser}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            ) : (
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

                                            <Button type="button" className="mt-4" onClick={() => setIsEditing(true)}>
                                                Edit Profile
                                            </Button>
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
                            )
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