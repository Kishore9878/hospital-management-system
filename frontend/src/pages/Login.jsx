

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from '../assets/hospital_png_2.png'
import { toast } from "react-toastify";
import { ArrowLeft, Loader } from "lucide-react";
import { axiosInstance } from "@/constant/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function AuthForm() {
    const [mode, setMode] = useState("login");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user)
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // 👇 If token exists in search params, switch to reset password form
        if (token) {
            setMode("reset");
        }
    }, [token]);
    // useEffect(() => {
    //     if (user && window.location.pathname !== "/dashboard") {
    //         navigate("/dashboard");
    //     }
    // }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (mode === "login" || mode === "register") {
                // const endpoint = mode === "login" ? "/user/login" : "/user/register";
                mode === "login" ? dispatch(loginUser(form, navigate)) : dispatch(registerUser(form, navigate));
                // const { data } = await axiosInstance.post(endpoint, form);
                // if (data.success) {
                //     dispatch(setUser(data?.user))
                //     toast.success(data?.message || `User ${mode} successfully`)
                // }
                // setLoading(false);
                // setTimeout(() => navigate("/dashboard"), 1200);
            } else if (mode === "forgot") {
                const { data } = await axiosInstance.post('/user/forgot-password', form);
                if (data.success) {
                    toast.success(data.message || 'Link has been sent your email')
                }
                setLoading(false);
            } else if (mode === "reset") {
                const { data } = await axiosInstance.post(`user/reset/token=${token}`, form);
                if (data.success) {
                    toast.success(data.message || 'Passwrod reset successfully')
                        ;
                    setTimeout(() => setMode("reset"), 1200);
                }
                setLoading(false);
            }

        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen  bg-gradient-to-br from-blue-100 via-white to-blue-50">

            <Button asChild size="sm" variant="outline" className="absolute top-5 left-5 z-50">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* <Link to="/"> */}
                    <Link className="flex gap-1 items-center" to={createPageUrl("Home")}>
                        <ArrowLeft /> Back to home
                    </Link>
                </motion.div>
            </Button>

            {/* Left side (image) */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center p-8 gap-6"
            >






                {/* Left side - Image */}
                <motion.img
                    src={logo || ""}
                    alt="Hospital illustration"
                    className="rounded-3xl shadow-2xl max-w-[300px] w-full object-cover"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Right side - Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-white max-w-xs"
                >
                    <h1 className="text-4xl font-bold mb-2">Welcome to Our Hospital</h1>
                    <p className="text-lg mb-4">
                        Providing quality healthcare with compassion and modern technology.
                    </p>
                    <p className="text-sm">
                        Access your account, schedule appointments, and manage your health easily online.
                    </p>
                </motion.div>
            </motion.div>



            {/* Right side (form) */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center h-screen justify-center w-full md:w-1/2 p-6"
            >
                <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <AnimatePresence mode="wait">
                        {/* 🟦 LOGIN FORM */}
                        {mode === "login" && (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                                    Welcome Back 👋
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        value={form.email}
                                        name="email"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                    />
                                    <input
                                        type="password"
                                        value={form.password}
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                    />
                                    <div className="flex justify-end text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setMode("forgot")}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                                    >
                                        {loading ? <Loader /> : 'Login'}
                                    </motion.button>
                                </form>
                                <p className="text-center mt-6 text-gray-600">
                                    Don’t have an account?{" "}
                                    <button
                                        onClick={() => setMode("register")}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Register
                                    </button>
                                </p>
                            </motion.div>
                        )}

                        {/* 🟩 REGISTER FORM */}
                        {mode === "register" && (
                            <motion.div
                                key="register"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                                    Create Account 🏥
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        value={form.fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="email"
                                        value={form.email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="password"
                                        value={form.password}
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />

                                    <select
                                        name="role"
                                        value={form.role || ""}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        >
                                        <option value="">Select Role</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>



                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                                    >
                                        {loading ? <Loader /> : 'Register'}
                                    </motion.button>
                                </form>
                                <p className="text-center mt-6 text-gray-600">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setMode("login")}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </motion.div>
                        )}

                        {/* 🟨 FORGOT PASSWORD */}
                        {mode === "forgot" && (
                            <motion.div
                                key="forgot"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                                    Forgot Password 🔑
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        value={form.email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                                    >
                                        {loading ? <Loader /> : 'Send Reset Link'}
                                    </motion.button>
                                </form>
                                <p className="text-center mt-6 text-gray-600">
                                    Remember your password?{" "}
                                    <button
                                        onClick={() => setMode("login")}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Back to Login
                                    </button>
                                </p>
                            </motion.div>
                        )}

                        {/* 🟥 RESET PASSWORD (when token exists) */}
                        {mode === "reset" && (
                            <motion.div
                                key="reset"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                                    Reset Your Password 🔐
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="cpassword"
                                        value={form.cpassword}
                                        name="cpassword"
                                        onChange={handleChange}
                                        placeholder="Confirm New Password"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                                    >
                                        {loading ? <Loader /> : ' Update Password'}

                                    </motion.button>
                                </form>
                                <p className="text-center mt-6 text-gray-600">
                                    Back to{" "}
                                    <button
                                        onClick={() => setMode("login")}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div >
    );
}




