/* eslint-disable react/prop-types */
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Mail, UserCircle2 } from "lucide-react";
import ProfileImage from "./ProfileImage";
import { Button } from "../ui/button";

const UserCard = ({ user, openDetailModal, onEdit }) => {
    if (!user) return null;

    const { fullName, email, role, profileImage, createdAt } = user.user || user;

    return (
        <Card className="w-full  rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center text-center">
                {profileImage ? (
                    <ProfileImage user={user} className="w-24 h-24 " />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                        <UserCircle2 className="w-12 h-12 text-gray-500" />
                    </div>
                )}
                <CardTitle className="text-lg font-semibold">{fullName}</CardTitle>
                <p className="text-sm text-gray-500 capitalize">{role}</p>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Mail size={16} />
                    <span>{email}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Joined: {new Date(createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                    <Button type="button" onClick={() => openDetailModal(user?._id)}>View</Button>
                    <Button type="button" variant="outline" onClick={() => onEdit?.(user?._id)}>Edit</Button>
                </div>
            </CardContent>
        </Card >
    );
};

export default UserCard;
