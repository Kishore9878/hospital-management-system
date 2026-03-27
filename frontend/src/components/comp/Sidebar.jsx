/* eslint-disable react/prop-types */
import { logoutUser } from '@/redux/slices/userSlice'
import { ChevronLeft, ChevronRight, ClipboardList, LayoutDashboard, LogOut, Plus, User, Users, Users2 } from 'lucide-react'
import { Button } from '../ui/button'
import logo from '../../assets/hospital_png_2.png'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { axiosInstance } from '@/constant/axios'
import { useEffect, useState } from 'react'

const Sidebar = ({ currentUser, sidebarOpen, setSidebarOpen, selectedLink, setSelectedLink }) => {

    const dispatch = useDispatch()


    let sideBarLinksData = [
        { icon: LayoutDashboard, label: "Dashboard", link: "dashboard" },
        { icon: ClipboardList, label: "Appointments", link: "appointments" },
        { icon: Users2, label: "Patients", link: "patients" },
        { icon: Users2, label: "Doctors", link: "doctors" },
        { icon: User, label: "Profile", link: "profile" },
        { icon: Plus, label: "Create", link: "create" },
    ]
    if (currentUser?.role !== "admin") {
        const restrictedLabels = ["Doctors", "Patients", "Create"];
        sideBarLinksData = sideBarLinksData.filter(
            (item) => !restrictedLabels.includes(item.label)
        );
    }


    const [allUsers, setAllUsers] = useState([])
    const getAllUsers = async () => {
        try {
            const { data } = await axiosInstance.get("/user/all");


            if (data?.success) {
                setAllUsers(data?.users); // Ensure consistency
            }
        } catch (err) {
            console.log(err.response?.data?.message);

        }
    };

    console.log("allUsers :", allUsers);


    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r shadow-md z-40 transform transition-transform duration-300 ease-in-out
                  ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} lg:translate-x-0 lg:w-64
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-3 border-b">
                    <Link to={createPageUrl("Home")} className="flex gap-2 items-center" >
                        <img className="w-12" src={logo} />
                        <h2 className="text-2xl font-bold text-indigo-400">LearnCode</h2>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-gray-700"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col p-4 space-y-2">
                    {sideBarLinksData.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                setSelectedLink(item.link)
                                setSidebarOpen(false)
                            }
                            }
                            className={`flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-blue-50 transition ${selectedLink === item.link ? "bg-blue-100 text-blue-700" : ""
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="mt-auto w-full p-4 border-t absolute bottom-0 ">
                    <button onClick={() => dispatch(logoutUser())} className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-red-50 transition">
                        <LogOut className="w-5 h-5" />
                        <span className="ml-3 text-red-600">Logout</span>
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar