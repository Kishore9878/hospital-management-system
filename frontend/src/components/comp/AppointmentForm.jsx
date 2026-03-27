/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createAppointmentUser } from "@/redux/slices/appoinmentSlice";
import { CheckCircle } from "lucide-react";
import { getAllDoctors } from "@/redux/slices/doctorsSlice";

// const departments = [
//     { value: "cardiology", label: "Cardiology" },
//     { value: "neurology", label: "Neurology" },
//     { value: "orthopedics", label: "Orthopedics" },
//     { value: "pediatrics", label: "Pediatrics" },
//     { value: "dermatology", label: "Dermatology" },
//     { value: "general_medicine", label: "General Medicine" }
// ];

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];
const AppointmentForm = ({ doctor, setSelectedModal, header = false }) => {
    const { user: currentUser } = useSelector(state => state.user)
    const { doctors } = useSelector(state => state.doctors)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        fullName: currentUser?.user?.fullName || "",
        email: currentUser?.user?.email || "",
        phone: currentUser?.phone || "",
        age: currentUser?.age || "",
        gender: currentUser?.gender || "",
        department: doctor?.department || "",
        doctorId: doctor?._id,
        doctorName: doctor?.user?.fullName || "",
        selectedDate: "",
        selectedTime: "",
        reason: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const getDepartments = [...new Set(doctors?.map(d => d.department))]

    const departments = [
        ...getDepartments.map((dept) => ({ value: dept, label: dept })),
    ];



    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
            // ...(field === "department" ? { doctorId: "", doctorName: "" } : {}),
        }));
    };


    const getDoctorsSelectedDepartment = useMemo(() => {
        return formData.department
            ? doctors.filter((d) => d.department === formData.department)
            : [];
    }, [formData.department, doctors]);
    // console.log("getDoctorsSelectedDepartment :", getDoctorsSelectedDepartment);


    const appointmentDetail = {
        patientId: currentUser._id,
        doctorId: formData.doctorId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
        time: formData.selectedTime,
        date: formData.selectedDate,
        reason: formData.reason,
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        dispatch(createAppointmentUser(appointmentDetail))

        setIsSubmitting(false);
        setSubmitted(true);
        setSelectedModal ? setSelectedModal(null) : null;

        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                department: "",
                doctor: "",
                selectedDate: "",
                selectedTime: "",
                reason: "",
            });
        }, 3000);
    };


    useEffect(() => {
        dispatch(getAllDoctors())
    }, [dispatch])
    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Requested!</h2>
                    <p className="text-xl text-gray-600 mb-2">
                        Thank you for choosing CarePlus Medical Center
                    </p>
                    <p className="text-gray-500">
                        We&#39;ll contact you shortly to confirm your appointment
                    </p>
                </motion.div>
            </div>
        );
    }
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Card className="border-0 shadow-2xl ">
                    {header && <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                        <CardTitle className="text-2xl">Appointment Details</CardTitle>
                    </CardHeader>}
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name *</Label>
                                    <Input
                                        id="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => handleChange("fullName", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone *</Label>
                                <Input
                                    id="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age *</Label>
                                    <Input
                                        id="age"
                                        required
                                        value={formData.age}
                                        onChange={(e) => handleChange("age", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select
                                        key={formData.gender}
                                        value={formData.gender}
                                        onValueChange={(val) => handleChange("gender", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender">
                                                {formData.gender || "Select gender"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Transgender">Transgender</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Department + Doctor */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Department *</Label>
                                    <Select
                                        value={formData.department}
                                        onValueChange={(val) => handleChange("department", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department">
                                                {formData.department || "Select department"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        {!doctor && <SelectContent>
                                            {departments.map((d) => (
                                                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                            ))}
                                        </SelectContent>}
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Doctor (Optional)</Label>
                                    {doctor ? <Input
                                        id="doctorName"
                                        value={doctor ? formData?.doctorName : formData?.doctorName}
                                        onChange={(e) => handleChange("doctor", e.target.value)}
                                    />
                                        :
                                        <Select
                                            value={formData.doctorId}
                                            onValueChange={(val) => {
                                                const selectedDoctor = getDoctorsSelectedDepartment.find(
                                                    (d) => d._id === val
                                                );
                                                handleChange("doctorId", val);
                                                handleChange("doctorName", selectedDoctor?.user?.fullName || "");
                                            }}
                                            disabled={!formData.department}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select doctor">
                                                    {formData.doctorName || "Select doctor"}
                                                </SelectValue>
                                            </SelectTrigger>

                                            <SelectContent>
                                                {getDoctorsSelectedDepartment.length > 0 && (
                                                    getDoctorsSelectedDepartment.map((d) => (
                                                        <SelectItem key={d._id} value={d._id}>
                                                            {d.user?.fullName}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                    }
                                </div>
                            </div>

                            {/* Date + Time */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date *</Label>
                                    <Input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split("T")[0]}
                                        value={formData.selectedDate}
                                        onChange={(e) => handleChange("selectedDate", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Time *</Label>
                                    <Select
                                        value={formData.selectedTime}
                                        onValueChange={(val) => handleChange("selectedTime", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-2">
                                <Label>Reason *</Label>
                                <Textarea
                                    value={formData.reason}
                                    onChange={(e) => handleChange("reason", e.target.value)}
                                />
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-blue-500  font-bold py-3 rounded-full shadow-lg">
                                {isSubmitting ? "Submitting..." : "Book Appointment"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default AppointmentForm