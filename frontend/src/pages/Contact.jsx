import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/comp/Layout";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        details: ["Emergency: 911", "Main: (555) 123-4567", "Appointments: (555) 123-4568"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Mail,
        title: "Email",
        details: ["info@learncode.com", "appointments@learncode.com", "emergency@learncode.com"],
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: MapPin,
        title: "Address",
        details: ["123 Medical Avenue", "Healthcare City, HC 12345", "United States"],
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Clock,
        title: "Hours",
        details: ["Mon-Fri: 8am - 8pm", "Saturday: 9am - 5pm", "Emergency: 24/7"],
        color: "from-orange-500 to-amber-500"
    }
];

const socialLinks = [
    { icon: Facebook, url: "#", color: "hover:text-blue-600" },
    { icon: Twitter, url: "#", color: "hover:text-blue-400" },
    { icon: Instagram, url: "#", color: "hover:text-pink-600" }
];

export default function Contact() {
    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We&#39;re here to help. Contact us for appointments, inquiries, or emergency services
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0">
                                    <CardContent className="p-6 text-center">
                                        <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                            <info.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                                        <div className="space-y-1">
                                            {info.details.map((detail, i) => (
                                                <p key={i} className="text-gray-600">{detail}</p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map and Info Section */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="h-full overflow-hidden border-0 shadow-2xl">
                                <div className="h-full min-h-[400px] bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98823492346652!3d40.748817371390724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1704309834195!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: "400px" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Hospital Location"
                                    />
                                </div>
                            </Card>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
                                    <p className="text-gray-600 mb-6">
                                        Our medical center is conveniently located in the heart of the city with ample parking and easy access to public transportation.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Main Entrance</h4>
                                                <p className="text-sm text-gray-600">Enter through the front lobby on Medical Avenue</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Parking Available</h4>
                                                <p className="text-sm text-gray-600">Free parking for patients and visitors</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold mb-4">Emergency Services</h2>
                                    <p className="text-blue-50 mb-6">
                                        For life-threatening emergencies, call 911 or visit our 24/7 emergency department
                                    </p>
                                    <div className="flex gap-4">
                                        <a href="tel:911" className="flex-1">
                                            <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                                                Call Emergency
                                            </button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Social Media */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className={`w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:shadow-lg hover:scale-110`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}