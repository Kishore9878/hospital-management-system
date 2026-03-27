import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
    Phone,

    Heart,
    Menu,
    Clock,
    Calendar,
    LogIn,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { learncode } from "@/constant/learncode";
import ProfileImage from "./ProfileImage";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logoutUser } from "@/redux/slices/userSlice";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, } = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const navigationItems = [
        { title: "Home", url: createPageUrl("Home") },
        { title: "Services", url: createPageUrl("Services") },
        { title: "Doctors", url: createPageUrl("Doctors") },
        { title: "Contact", url: createPageUrl("Contact") },
    ];
    return (
        <div>
            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-semibold">Emergency: 911</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>24/7 Emergency Services Available</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <Heart className="w-7 h-7 text-white" fill="currentColor" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                    {learncode}
                                </h1>
                                <p className="text-xs text-gray-500">Medical Center</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.url}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === item.url
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        {user ? <div className="hidden md:flex items-center gap-3">
                            <Link to={createPageUrl("Appointments")}>
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book Appointment
                                </Button>
                            </Link>


                            <Popover>
                                <PopoverTrigger>  <ProfileImage user={user} className="w-10 h-10" /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className="flex flex-col justify-center items-center gap-3">
                                        <Button size="sm" variant="outline">
                                            {user.role === "admin" ?
                                                <Link to={createPageUrl("AdminDashboard")}>Dashboard</Link>
                                                :
                                                <Link to={createPageUrl("Dashboard")}>Dashboard</Link>
                                            }
                                        </Button>
                                        <Button onClick={() => dispatch(logoutUser())} size="sm" variant="outline" className=""><LogOut /> Logout</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>
                            :
                            <div className="hidden md:flex items-center gap-3">
                                <Link to={createPageUrl("Login")}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Login
                                    </Button>
                                </Link>
                            </div>}

                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="outline" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <div className="flex flex-col gap-6 mt-8">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            to={item.url}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`text-lg font-medium transition-colors ${location.pathname === item.url
                                                ? "text-blue-600"
                                                : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <Link to={createPageUrl("Appointments")} onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Book Appointment
                                        </Button>
                                    </Link>
                                    <Popover>
                                        <PopoverTrigger>  <ProfileImage user={user} className="w-10 h-10" /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className="flex flex-col justify-center items-center gap-3">
                                                <Button size="sm" variant="outline">
                                                    <Link to={createPageUrl("Dashboard")}>Dashboard</Link>
                                                </Button>
                                                <Button onClick={() => dispatch(logoutUser())} size="sm" variant="outline" className=""><LogOut /> Logout</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar