import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Modal from "@/components/comp/Modal";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Award } from "lucide-react";
import Layout from "@/components/comp/Layout";
import AppointmentForm from "@/components/comp/AppointmentForm";
import { getAllDoctors } from "@/redux/slices/doctorsSlice";
import ProfileImage from "@/components/comp/ProfileImage";
import { allDoctors as dummyDoctors } from "../services/Doctor";

const specializationColors = {
    Cardiology: "bg-red-100 text-red-800 border-red-200",
    Neurology: "bg-purple-100 text-purple-800 border-purple-200",
    Orthopedics: "bg-orange-100 text-orange-800 border-orange-200",
    Pediatrics: "bg-green-100 text-green-800 border-green-200",
    Dermatology: "bg-pink-100 text-pink-800 border-pink-200",
    General_Medicine: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function Doctors() {
    const { doctors, loading: isLoading } = useSelector(state => state.doctors)
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Hovered doctor for details tooltip
    const [hoveredDoctorId, setHoveredDoctorId] = useState(null);

    // const [doctors, setDoctors] = useState([]);
    const [doctorDetail, setDoctorDetail] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    const [selectedModal, setSelectedModal] = useState(null); // 'detail' | 'appointment' | null
    const [selectedSpecialization, setSelectedSpecialization] = useState("all");

    const { doctors: apiDoctors } = useSelector((state) => state.doctors);

    // Combine dummy data with API-fetched doctors and dedupe by email (or ID if available)
    const allDoctorsData = [
        ...dummyDoctors,
        ...(apiDoctors || []),
    ].reduce((unique, doctor) => {
        const key = doctor.email || doctor?._id || doctor.fullName;
        if (!unique.some((item) => item.email === key || item._id === key || item.fullName === key)) {
            unique.push(doctor);
        }
        return unique;
    }, []);

    const dispatch = useDispatch()

    useEffect(() => {
        // loadDoctors();
        dispatch(getAllDoctors())
    }, [dispatch]);



    // const loadDoctors = async () => {
    //     setIsLoading(true);
    //     try {
    //         // const data = typeof allDoctors === "function" ? await allDoctors() : allDoctors;
    //         const { data } = await axiosInstance.get("/doctor/all");
    //         console.log("data :", data);

    //         setDoctors(data?.doctors || []);
    //     } catch (error) {
    //         console.error("Error fetching doctors:", error);
    //         setDoctors([]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const openDoctorDetail = (id) => {
        const doctor = doctors?.find((d) => d._id === id);
        setDoctorDetail(doctor);
        setSelectedModal("detail");
    };

    const openAppointmentForm = (doctor) => {
        setDoctorDetail(doctor);
        setSelectedModal("appointment");
    };

    const handleBookAction = (doctor) => {
        if (!isAuthenticated) {
            toast.info("Login as patient to book an appointment.");
            navigate("/login");
            return;
        }

        if (user?.role !== "patient") {
            toast.info("Only patients can book appointments.");
            return;
        }

        openAppointmentForm(doctor);
    };

    const closeModal = () => {
        setSelectedModal(null);
        setDoctorDetail(null);
    };
    const departments = [
    ...new Set(allDoctorsData?.map((d) => d.department).filter(Boolean))
    ];
    const specializations = [
        { value: "all", label: "All Departments" },
        ...departments.map((dept) => ({ value: dept, label: dept })),
    ];

    const filteredDoctors =
    selectedSpecialization === "all"
        ? allDoctorsData
        : allDoctorsData?.filter((doc) => doc?.department === selectedSpecialization);


    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Medical Team</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet our experienced healthcare professionals dedicated to providing exceptional care.
                        </p>
                    </motion.div>

                    {/* Specialization Filters */}
                    <div className="mb-12">
                        <div className="flex overflow-x-auto gap-3 px-2 no-scrollbar">
                            {specializations.map((spec) => (
                                <button
                                    key={spec.value}
                                    onClick={() => setSelectedSpecialization(spec.value)}
                                    className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedSpecialization === spec.value
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    {spec.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Doctors Grid */}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <Skeleton className="h-64 w-full" />
                                        <CardContent className="p-6">
                                            <Skeleton className="h-6 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2 mb-4" />
                                            <Skeleton className="h-20 w-full" />
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">No doctors found in this department yet.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredDoctors.map((doctor, index) => {
                                console.log("doctor :", doctor);

                                const fullName = doctor?.user?.fullName || doctor?.fullName || "Unknown Doctor";
                                const department = doctor?.department || "general_medicine";


                                return (
                                    <motion.div
                                        key={doctor._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="overflow-hidden  pt-2 hover:shadow-2xl transition-all duration-300 border-0 h-full">
                                            <div className="w-full h-32 flex justify-center items-center">
                                                {doctor && (
                                                    <div className="w-32 h-32 flex justify-center items-center rounded-full overflow-hidden">
                                                        {/* <img
                                                            src={
                                                                doctor?.user?.profileImage?.url ||
                                                                doctor?.profileImage?.url ||
                                                                `https://placehold.co/150x150/blue/FFFFFF?text=${doctor?.user?.fullName?.slice(0, 2).toUpperCase() ||
                                                                doctor?.fullName?.slice(0, 2).toUpperCase()
                                                                }`
                                                            }
                                                            alt="Profile"
                                                            className="w-full h-full object-cover"
                                                        /> */}
                                                        <ProfileImage user={doctor?.user} className="w-full h-full" imageBg="blue" letter={2} />
                                                    </div>
                                                )}
                                            </div>
                                            <CardContent className="p-6 relative">
                                                <h3
                                                    onClick={() => openDoctorDetail(doctor._id)}
                                                    onMouseEnter={() => setHoveredDoctorId(doctor._id)}
                                                    onMouseLeave={() => setHoveredDoctorId(null)}
                                                    className="text-xl cursor-pointer hover:underline font-bold text-gray-900 mb-1"
                                                >
                                                    Dr. {fullName}
                                                </h3>

                                                {hoveredDoctorId === doctor._id && (
                                                    <div className="absolute z-30 top-10 left-0 w-72 bg-white shadow-lg border border-gray-200 p-3 rounded-lg text-sm text-gray-700">
                                                        <div>
                                                            <span className="font-semibold">Department:</span> {doctor.department || "N/A"}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Qualifications:</span> {doctor.qualifications || "N/A"}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Experience:</span> {doctor.experienceYears ? `${doctor.experienceYears} years` : "N/A"}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Availability:</span> {doctor.availableTimes || "N/A"}
                                                        </div>
                                                        {Array.isArray(doctor.availableDays) && doctor.availableDays.length > 0 && (
                                                            <div>
                                                                <span className="font-semibold">Days:</span> {doctor.availableDays.join(", ")}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <Badge
                                                    className={`mb-4 ${specializationColors[department] ||
                                                        specializationColors["general_medicine"]
                                                        } border`}
                                                >
                                                    {department.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                </Badge>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                    <Award className="w-4 h-4" />
                                                    <span>{doctor.qualifications}</span>
                                                </div>

                                                {Array.isArray(doctor?.availableDays) &&
                                                    doctor.availableDays.length > 0 ? (
                                                    <div className="pt-4 border-t">
                                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                                            Available:
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {doctor.availableDays.map((day, i) => (
                                                                <Badge
                                                                    key={i}
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {day}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="pt-4 border-t text-sm text-gray-400">
                                                        Availability not listed
                                                    </div>
                                                )}
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    onClick={() => handleBookAction(doctor)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                >
                                                    {!isAuthenticated
                                                        ? "Login"
                                                        : user?.role === "patient"
                                                            ? "Book Appointment"
                                                            : "Login"}
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    {/* Unified Modal */}
                    {selectedModal && doctorDetail && (
                        <Modal
                            selectedPatient={selectedModal}
                            setSelectedPatient={closeModal}

                        >
                            {selectedModal === "detail" ? (
                                <div className="text-left space-y-6 h-96 bg-white overflow-y-auto  no-scrollbar">

                                    {/* Doctor Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="md:col-span-1 flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-primary-blue text-3xl font-bold mb-4 border-4 border-primary-blue/50">
                                                <ProfileImage user={doctorDetail?.user} className="w-full h-full" letter={2} imageBg="blue" />
                                            </div>
                                            <p className="text-xl text-secondary-green font-semibold mt-1 text-center">
                                                {doctorDetail.specialty}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2 text-center">{doctorDetail.description}</p>

                                            <h5 className="font-bold text-xl text-primary-blue my-2">
                                                Dr. {doctorDetail?.user?.fullName || doctorDetail.fullName}</h5>

                                        </div>
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h5 className="font-bold text-primary-blue mb-2">Biography</h5>
                                                <p className="text-md text-gray-700 leading-relaxed">{doctorDetail.bio || doctorDetail.description}</p>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-primary-blue mb-2">Department</h5>
                                                <p className="text-md text-gray-700 leading-relaxed">{doctorDetail.department}</p>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-primary-blue mb-2">Available Time</h5>
                                                <p className="text-md text-gray-700 leading-relaxed">{doctorDetail.availableTimes}</p>
                                            </div>
                                            <div>
                                                <h5 className=" font-bold text-primary-blue mb-2">Experience </h5>
                                                <p className="text-md text-gray-700 leading-relaxed">{doctorDetail?.experienceYears}+ years of experience</p>

                                            </div>
                                            <div>
                                                <h5 className=" font-bold text-primary-blue mb-2">Qualifications </h5>
                                                <p className="text-md text-gray-700 leading-relaxed">{doctorDetail?.qualifications}</p>

                                            </div>

                                            {
                                                Array.isArray(doctorDetail?.availableDays) &&
                                                doctorDetail?.availableDays?.length > 0 &&
                                                <div className="pt-4 border-t">
                                                    <h5 className=" font-bold text-primary-blue mb-2">Available Days</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {doctorDetail?.availableDays?.map((day, i) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {day}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setSelectedModal("appointment")}
                                        className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-full shadow-lg"
                                    >
                                        Book Appointment
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-left  overflow-y-auto h-96 no-scrollbar">
                                    <section className="bg-white">
                                        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

                                        <Button onClick={() => setSelectedModal("detail")} variant="outline" className="bg-green-600">
                                            ← Back to Profile
                                        </Button>
                                        <AppointmentForm doctor={doctorDetail} setSelectedModal={setSelectedModal} />

                                    </section>
                                </div>
                            )}
                        </Modal>
                    )}


                </div>
            </div>
        </Layout >
    );
}
