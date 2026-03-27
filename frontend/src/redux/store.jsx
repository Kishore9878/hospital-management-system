import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../redux/slices/userSlice'
import doctorsSlice from "./slices/doctorsSlice";
import appointmentSlice from "./slices/appoinmentSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        doctors: doctorsSlice,
        appointment: appointmentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
