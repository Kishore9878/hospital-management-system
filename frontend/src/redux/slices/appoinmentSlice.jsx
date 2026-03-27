
import { axiosInstance } from "@/constant/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        loading: false,
        error: null,
        appointment: null

    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAppointment: (state, action) => {
            state.appointment = action.payload;
            state.error = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setAppointment, setError } = appointmentSlice.actions;
export default appointmentSlice.reducer;


// create appointment 
// Login
export const createAppointmentUser = (appointmentData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        console.log("appointmentData :", appointmentData);

        // Validate the IDs before making the request
        // const isValidObjectId = (id) => {
        //     return id && typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
        // };

        // // Debug: Check each ID
        // console.log("Patient ID:", appointmentData.patientId, "Valid:", isValidObjectId(appointmentData.patientId));
        // console.log("Doctor ID:", appointmentData.doctorId, "Valid:", isValidObjectId(appointmentData.doctorId));

        // if (!isValidObjectId(appointmentData.patientId)) {
        //     throw new Error(`Invalid Patient ID: ${appointmentData.patientId}`);
        // }

        // if (!isValidObjectId(appointmentData.doctorId)) {
        //     throw new Error(`Invalid Doctor ID: ${appointmentData.doctorId}`);
        // }
        const { data } = await axiosInstance.post("/user/create/appointment", appointmentData);
        if (data?.success) {
            dispatch(setAppointment(data.appointment));
            toast.success(data.message);
            // setTimeout(() => navigate("/dashboard"), 1200);
        }

    } catch (err) {
        console.log("err.response :", err);

        dispatch(setError(err.response?.data?.message || "Appointment failed"));
        toast.error(err.response?.data?.message || "Appointment failed");
    } finally {
        dispatch(setLoading(false));
    }
};