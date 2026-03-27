/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function AppointmentCard({ appointment, handleStatusUpdate, showPatient = false, showDoctor = false }) {

    return (
        <Card

            className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500"
        >
            <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                    Reason : {appointment?.reason || "N/A"}
                </h3>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(appointment.date), "MMM dd, yyyy")}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {(() => {
                            if (!appointment?.time) return "N/A";
                            const [hour, minute] = appointment.time.split(":").map(Number);
                            const ampm = hour >= 12 ? "PM" : "AM";
                            const formattedHour = hour % 12 || 12; // convert 0 -> 12, 13 -> 1
                            return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
                        })()}
                    </div>


                    {
                        showPatient && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-4 h-4" />
                                Patient: {appointment?.fullName}
                            </div>
                        )
                    }
                    {
                        showDoctor && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-4 h-4" />
                                Dr. {appointment.doctor?.user?.fullName || 'N/A'}
                            </div>
                        )
                    }
                </div>

                <div className="flex justify-end mt-3">
                    <div className="flex justify-end mt-3">
                        <Select
                            value={appointment.status}
                            onValueChange={(newStatus) => handleStatusUpdate(appointment._id, newStatus)}
                        >
                            <SelectTrigger className={`
                                    w-40 transition-colors
                                    ${appointment.status === 'scheduled' ? 'border-blue-500 bg-blue-50 text-blue-900' : ''}
                                    ${appointment.status === 'completed' ? 'border-green-500 bg-green-50 text-green-900' : ''}
                                    ${appointment.status === 'canceled' ? 'border-red-500 bg-red-50 text-red-900' : ''}
                                `}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="canceled">Canceled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
}