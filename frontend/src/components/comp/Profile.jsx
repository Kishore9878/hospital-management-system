import { useEffect, useState } from 'react'
import { Camera } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '@/constant/axios'
import { setUser } from '@/redux/slices/userSlice'
import Loader from './Loader'
import { toast } from 'react-toastify'


const Profile = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)

    console.log("user admin :", user);



    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        bloodGroup: "",
        department: "",
        qualifications: "",
        experienceYears: "",
        age: "",
        address: "",
        availableDays: [],
        availableTimes: "",
        description: "",

    })

    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user?.fullName || user?.user?.fullName || "",
                email: user?.email || user?.user?.email || "",
                phone: user?.phone || "",
                gender: user?.gender || "",
                bloodGroup: user?.bloodGroup || "",
                department: user?.department || "",
                qualifications: user?.qualifications || "",
                experienceYears: user?.experienceYears || "",
                age: user?.age || "",
                address: user?.address || "",
                availableDays: user?.availableDays || [],
                availableTimes: user?.availableTimes || "",
                description: user?.description || "",
            })
        }

        setProfileImage(user?.profileImage?.url || user?.user?.profileImage?.url || null)
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }))
    }
    const handleSave = async (e) => {
        e.preventDefault()
        // console.log("Updated profile!");

        // dispatch(updateUserProfile(profileData))
        setLoading(true)
        try {
            const { data } = await axiosInstance.put('/user/update/profile', profileData)
            console.log("data :", data);

            dispatch(setUser(data?.profile || data?.user))
            toast.success(data.message)
        } catch (error) {
            console.log("Error with updating profile", error);

        } finally {
            setLoading(false)
        }

    }
    const handleImageChange = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        if (!file) return
        setProfileImage(URL.createObjectURL(file))
        const formData = new FormData()
        formData.append('profileImage', file)
        try {
            const { data } = await axiosInstance.put('/user/upload-image', formData)
            console.log("data image :", data);

            dispatch(setUser(data?.profile))
            // dispatch(getUserProfile())
            toast.success(data?.message)
        } catch (error) {
            console.log("Error with updating profile", error);

        } finally {
            setLoading(false)
        }
        // await updateProfileImage(formData)

    }

    const toggleDay = (day) => {
        setProfileData((prev) => {
            const days = prev.availableDays.includes(day)
                ? prev.availableDays.filter((d) => d !== day)
                : [...prev.availableDays, day];
            return { ...prev, availableDays: days };
        });
    };

    let userInputData = [
        "fullName",
        "email",
        "gender",
        "bloodGroup",
        "department",
        "qualifications",
        "experienceYears",
        "phone",
        "age",
        "address",
        "availableDays",
        "availableTimes",
        "description",
    ];

    const userRole = user?.role || user?.user?.role;

    if (userRole !== "doctor") {
        userInputData = userInputData.filter(
            (field) =>
                ![
                    "department",
                    "qualifications",
                    "experienceYears",
                    "availableDays",
                    "availableTimes",
                    "description",
                ].includes(field)
        );
    }


    // if (loading) return (<div>Loading..</div>)

    if (loading) return <Loader />
    return (
        <div className='flex min-h-screen  text-white'>
            <div className="flex-1 max-w-3xl w-full mx-auto flex flex-col gap-6 items-center justify-center">
                <div className='backdrop-blur-xl rounded-lg shadow-lg w-full px-4 sm:px-6 md:px-8 py-6 bg-gray-50 text-black border border-gray-300'
                >
                    <header className='flex items-center justify-between mb-6'>
                        <h1 className='font-bold text-lg'>Edit Profile</h1>
                        <button onClick={handleSave} className='font=semibold text-lg text-blue-600 '>Done</button>
                    </header>

                    {/* Profile Picture  */}
                    <section className='flex flex-col items-center mb-6'>
                        <div className='relative'>
                            <img src={profileImage || `https://placehold.co/150X150/FFFFFF/000000?text=${(user?.fullName || user?.user?.fullName || "U").charAt(0).toUpperCase()}`} alt="profile"
                                className='w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300'
                            />
                            <label className='w-8 h-8 p-2 flex items-center justify-center absolute bottom-4 right-0 rounded-full cursor-pointer bg-gray-300/50'>
                                <Camera size={24} />
                                <input type="file" className='hidden' accept='image/*' onChange={handleImageChange} />
                            </label>
                        </div>
                        <label className='font-semibold text-sm cursor-pointer text-blue-600 '>
                            Change profile photo
                            <input type="file" className='hidden' accept='image/*' onChange={handleImageChange} />
                        </label>
                    </section>

                    {/* Edit Form  */}
                    <div className='space-y-6'>
                        {
                            userInputData.map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className='block text-sm font-medium mb-1 text-gray-700 capitalize'>{field}</label>
                                    {field === "bio" ?
                                        <textarea name={field} id={field} value={profileData[field]} onChange={handleChange}
                                            className='w-full h-24 outline-none p-2 text-sm resize-none placeholder-gray-400 border-b border-gray-300 bg-transparent text-black focus:border-blue-600'
                                        ></textarea>
                                        : field === "availableDays" ? (
                                            <div className="flex overflow-x-auto gap-2 py-2">
                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                                    (day) => (
                                                        <span
                                                            key={day}
                                                            onClick={() => toggleDay(day)}
                                                            className={`flex-shrink-0 cursor-pointer px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 ${profileData.availableDays.includes(day)
                                                                ? "bg-blue-500 text-white border-blue-500"
                                                                : "bg-gray-100 text-gray-700 border-gray-300"
                                                                }`}
                                                        >
                                                            {day}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <input
                                                type={
                                                    field === "email"
                                                        ? "email"
                                                        : field === "phone"
                                                            ? "tel"
                                                            : field === "age"
                                                                ? "number"
                                                                : "text"
                                                }
                                                id={field}
                                                name={field}
                                                value={profileData[field]}
                                                onChange={handleChange}
                                                className="w-full outline-none p-2 text-sm placeholder-gray-400 border-b border-gray-300 bg-transparent text-black focus:border-blue-600"
                                                placeholder={`Enter your ${field}`}
                                            />
                                        )


                                    }
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile