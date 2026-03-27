/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, trend, trendUp, color = "blue" }) {
    const colorClasses = {
        blue: "from-blue-500 to-cyan-500",
        green: "from-green-500 to-emerald-500",
        purple: "from-purple-500 to-pink-500",
        orange: "from-orange-500 to-red-500"
    };

    return (
        <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            {trendUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            {trend}
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </CardContent>
        </Card>
    );
}