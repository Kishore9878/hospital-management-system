import { learncode } from "@/constant/learncode";
import { createPageUrl } from "@/utils";
import { Heart, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom";
const navigationItems = [
    { title: "Home", url: createPageUrl("Home") },
    { title: "Services", url: createPageUrl("Services") },
    { title: "Doctors", url: createPageUrl("Doctors") },
    { title: "Appointments", url: createPageUrl("Appointments") },
    { title: "Contact", url: createPageUrl("Contact") }
];
const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-blue-400" fill="currentColor" />
                            <h3 className="text-xl font-bold">{learncode}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Providing exceptional healthcare services with compassion and expertise since 1995.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.url}
                                    className="block text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>123 Medical Avenue, Healthcare City, HC 12345</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>info@careplus.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-semibold mb-4">Hours</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Mon - Fri:</span>
                                <span className="text-white">8am - 8pm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday:</span>
                                <span className="text-white">9am - 5pm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday:</span>
                                <span className="text-white">10am - 4pm</span>
                            </div>
                            <div className="pt-2 border-t border-gray-700">
                                <span className="text-red-400 font-semibold">Emergency: 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} LearCode Medical Center. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer