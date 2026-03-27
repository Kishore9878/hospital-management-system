

import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Heart,
    Clock,
    Users,
    Award,
    ArrowRight,
    CheckCircle,
    Phone,
    Calendar,
    Stethoscope,
    Activity,
    Shield,
    LogIn
} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Layout from "@/components/comp/Layout";

const services = [
    {
        icon: Heart,
        title: "Cardiology",
        description: "Advanced heart care and cardiovascular treatments",
        color: "from-red-500 to-pink-500"
    },
    {
        icon: Activity,
        title: "Neurology",
        description: "Expert neurological care and brain health services",
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: Stethoscope,
        title: "General Medicine",
        description: "Comprehensive primary care for all ages",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Users,
        title: "Pediatrics",
        description: "Specialized care for infants, children, and adolescents",
        color: "from-green-500 to-emerald-500"
    }
];

const stats = [
    { icon: Users, value: "50K+", label: "Patients Treated" },
    { icon: Award, value: "100+", label: "Expert Doctors" },
    { icon: Clock, value: "24/7", label: "Emergency Care" },
    { icon: Shield, value: "30+", label: "Years Experience" }
];

const features = [
    "State-of-the-art medical equipment",
    "Highly qualified medical professionals",
    "Comprehensive diagnostic services",
    "Patient-centered care approach",
    "Modern comfortable facilities",
    "Insurance accepted"
];

export default function Home() {
    const { user } = useSelector((state) => state.user);
    return (
        <Layout>

            <div className="overflow-hidden">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    Your Health is Our
                                    <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                        Top Priority
                                    </span>
                                </h1>
                                <p className="text-xl mb-8 text-blue-50 leading-relaxed">
                                    Experience world-class healthcare with compassionate professionals dedicated to your well-being.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {user ? <Link to={createPageUrl("Appointments")}>
                                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Book Appointment
                                        </Button>
                                    </Link>
                                        :
                                        <Link to={createPageUrl("Login")}>
                                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                                <LogIn className="w-5 h-5 mr-2" />
                                                Login
                                            </Button>
                                        </Link>}
                                    <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Emergency: 911
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="hidden md:block"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-3xl blur-3xl" />
                                    <img
                                        src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop"
                                        alt="Medical Care"
                                        className="relative rounded-3xl shadow-2xl w-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-gray-500">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Our Medical Services
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Comprehensive healthcare solutions tailored to your needs
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden h-full">
                                        <CardContent className="p-6">
                                            <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <service.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                            <Link to={createPageUrl("Services")} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                                                Learn more
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link to={createPageUrl("Services")}>
                                <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-all">
                                    View All Services
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-4xl font-bold mb-6">Why Choose CarePlus?</h2>
                                <p className="text-xl text-blue-50 mb-8">
                                    We combine cutting-edge medical technology with compassionate care to deliver exceptional healthcare experiences.
                                </p>
                                <div className="space-y-4">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                                            <span className="text-lg">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
                                <img
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
                                    alt="Medical Team"
                                    className="relative rounded-3xl shadow-2xl w-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Ready to Experience Quality Healthcare?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Book an appointment with our expert medical team today
                            </p>
                            {user ? <Link to={createPageUrl("Appointments")}>
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Schedule Your Visit
                                </Button>
                            </Link>
                                :
                                <Link to={createPageUrl("Login")}>
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <LogIn className="w-5 h-5 mr-2" />
                                        Click For Login To Make Appointment
                                    </Button>
                                </Link>}
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}