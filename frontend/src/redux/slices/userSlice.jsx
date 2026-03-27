import { axiosInstance } from "@/constant/axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false,
        // selectedLink: null
        appointment: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            const payload = action.payload;
            // Normalize API payloads into one flat user object.
            // If payload contains nested `user`, keep profile fields (age/department/etc)
            // and merge base user fields (fullName/email/role/profileImage) on top.
            if (payload?.user && typeof payload.user === "object") {
                state.user = {
                    ...payload,
                    ...payload.user,
                };
            } else {
                state.user = payload;
            }
            state.isAuthenticated = true;
            state.error = null;
        },
        setAppointment: (state, action) => {
            state.appointment = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        // setSelectedLink: (state, action) => {
        //     state.selectedLink = action.payload;
        // },
        setLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { setLoading, setUser, setAppointment, setError, setLogout, setSelectedLink } = userSlice.actions;
export default userSlice.reducer;

// Register
export const registerUser = (userData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.post("/user/register", userData);
        if (data?.success) {
            dispatch(setUser(data.user));
            toast.success(data.message);
            navigate("/dashboard");
            // setTimeout(() => navigate("/dashboard"), 1200);
        }
    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Registration failed"));
        toast.error(err.response?.data?.message || "Registration failed");
    } finally {
        dispatch(setLoading(false));
    }
};

// Login
export const loginUser = (userData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.post("/user/login", userData);
        if (data?.success) {
            dispatch(setUser(data.user));
            toast.success(data.message);
            // navigate("/")
            navigate("/dashboard"); 
            // setTimeout(() => navigate("/"), 1200);
        }

    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Login failed"));
        toast.error(err.response?.data?.message || "Login failed");
    } finally {
        dispatch(setLoading(false));
    }
};

// Logout
export const logoutUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.get("/user/logout");
        if (data?.success) {
            dispatch(setLogout());
            toast.success(data.message);
            window.location.href = "/"
            // setTimeout(() => window.location.href = "/", 1200);
        }
    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Logout failed"));
        toast.error(err.response?.data?.message || "Logout failed");
    } finally {
        dispatch(setLoading(false));
    }
};

// Get Profile
export const getUserProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.get("/user/profile");
        console.log("data :", data);

        if (data?.success) {
            // Prefer profile when available so doctor/patient-specific fields are preserved.
            dispatch(setUser(data?.profile || data?.user));
        }
    } catch (err) {
        console.log("PROFILE ERROR:", err);
        // toast.error(err.response?.data?.message || "Fetching profile failed");
    } finally {
        dispatch(setLoading(false));
    }
};
// // Get Profile
// export const updateUserProfile = (profileData) => async (dispatch) => {
//     dispatch(setLoading(true));
//     console.log("profileData :", profileData);

//     try {
//         const { data } = await axiosInstance.put('/user/update/profile', profileData)
//         console.log("data update:", data);

//         if (data?.success) {
//             // dispatch(getUserProfile());
//             dispatch(setUser(data?.user)); // Ensure consistency
//             toast.success(data?.message)
//         }
//     } catch (err) {
//         dispatch(setError(err.response?.data?.message || "Fetching profile failed"));
//         // toast.error(err.response?.data?.message || "Fetching profile failed");
//     } finally {
//         dispatch(setLoading(false));
//     }
// };
export const forgotPassword = (email) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.post(`/user/forgot-password`, {
            email,
        });
        if (data?.success)
            toast.success(data.message || "Password reset link sent");
    } catch (err) {
        dispatch(setError(err?.response?.data?.message || "Request failed"));
        toast.error(err?.response?.data?.message || "Request failed");
    } finally {
        dispatch(setLoading(false));
    }
};


