/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { backendApi } from "@/constant/Api"
import { setLoading, setUser } from "@/redux/slices/userSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { updateUserProfile, updateDoctorProfile } from "@/redux/slices/userSlice";

const UpdateProfile = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        department: user?.department || '',
        qualifications: user?.qualifications || '',
        experienceYears: user?.experienceYears || '',
        phone: user?.phone || '',
        age: user?.age || '',
        address: user?.address || '',
        gender: user?.gender || '',
        bloodGroup: user?.bloodGroup || '',
        description: user?.description || '',
        bio: user?.bio || '',
        availableDays: user?.availableDays?.join(', ') || '',
        availableTimes: user?.availableTimes || '',
    });


    const onchangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    let axiosConfig = {
        withCredentials: true,
    }

    const updateHandler = async (e) => {
        e.preventDefault()

        let processedData = { ...userData };

        if (user.role === "doctor") {
            // Process availableDays to array
            if (processedData.availableDays) {
                processedData.availableDays = processedData.availableDays.split(',').map(day => day.trim()).filter(day => day);
            } else {
                processedData.availableDays = [];
            }
            // Convert numbers
            if (processedData.experienceYears) processedData.experienceYears = parseInt(processedData.experienceYears);
            if (processedData.age) processedData.age = parseInt(processedData.age);
            if (processedData.phone) processedData.phone = parseInt(processedData.phone);

            dispatch(updateDoctorProfile(processedData));
        } else {
            dispatch(updateUserProfile(processedData));
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullName" className="text-left">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={userData.fullName}
                            onChange={onchangeHandler}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-left">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            onChange={onchangeHandler}
                            value={userData.email}
                            className="col-span-3"
                        />
                    </div>
                    {user?.role === "doctor" && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="department" className="text-left">
                                    Department
                                </Label>
                                <Input
                                    id="department"
                                    name="department"
                                    value={userData.department}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="qualifications" className="text-left">
                                    Qualifications
                                </Label>
                                <Input
                                    id="qualifications"
                                    name="qualifications"
                                    value={userData.qualifications}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="experienceYears" className="text-left">
                                    Experience Years
                                </Label>
                                <Input
                                    id="experienceYears"
                                    name="experienceYears"
                                    value={userData.experienceYears}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-left">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="age" className="text-left">
                                    Age
                                </Label>
                                <Input
                                    id="age"
                                    name="age"
                                    value={userData.age}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-left">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={userData.address}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gender" className="text-left">
                                    Gender
                                </Label>
                                <Input
                                    id="gender"
                                    name="gender"
                                    value={userData.gender}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bloodGroup" className="text-left">
                                    Blood Group
                                </Label>
                                <Input
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    value={userData.bloodGroup}
                                    onChange={onchangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="availableDays" className="text-left">
                                    Available Days
                                </Label>
                                <Input
                                    id="availableDays"
                                    name="availableDays"
                                    value={userData.availableDays}
                                    onChange={onchangeHandler}
                                    placeholder="e.g., Monday, Tuesday"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-left">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    value={userData.description}
                                    onChange={onchangeHandler}
                                    placeholder="Short profile summary"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-left">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={userData.bio}
                                    onChange={onchangeHandler}
                                    placeholder="Longer biography"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="availableTimes" className="text-left">
                                    Available Times
                                </Label>
                                <Input
                                    id="availableTimes"
                                    name="availableTimes"
                                    value={userData.availableTimes}
                                    onChange={onchangeHandler}
                                    placeholder="e.g., 09:00-17:00"
                                    className="col-span-3"
                                />
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={updateHandler}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile