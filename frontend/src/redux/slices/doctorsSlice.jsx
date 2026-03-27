
import { axiosInstance } from "@/constant/axios";
import { createSlice } from "@reduxjs/toolkit";

export const doctorsSlice = createSlice({
    name: "doctors",
    initialState: {
        loading: false,
        error: null,
        doctors: [],

    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDoctors: (state, action) => {
            state.doctors = action.payload;
            state.error = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },


    },
});

export const { setLoading, setDoctors, setError } = doctorsSlice.actions;
export default doctorsSlice.reducer;


// Get Profile
export const getAllDoctors = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.get("/doctor/all");
        console.log("data :", data);

        if (data?.success) {
            dispatch(setDoctors(data?.doctors)); // Ensure consistency
        }
    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Fetching doctors failed"));
    } finally {
        dispatch(setLoading(false));
    }
};