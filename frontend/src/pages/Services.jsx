import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Heart,
    Brain,
    Bone,
    Baby,
    Thermometer,
    Stethoscope,
    Activity,
    Eye,
    Ear,
    Pill
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/comp/Layout";

const departments = [
    {
        icon: Heart,
        name: "Cardiology",
        description: "Comprehensive heart care including diagnostics, treatment, and preventive cardiology",
        services: ["ECG", "Echocardiography", "Cardiac Stress Tests", "Angiography", "Heart Disease Prevention"],
        color: "from-red-500 to-pink-500"
    },
    {
        icon: Brain,
        name: "Neurology",
        description: "Expert care for neurological disorders and brain health",
        services: ["Stroke Care", "Epilepsy Treatment", "Headache Management", "Memory Disorders", "Neurological Rehabilitation"],
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: Bone,
        name: "Orthopedics",
        description: "Advanced treatment for bone, joint, and musculoskeletal conditions",
        services: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Spine Surgery", "Physical Therapy"],
        color: "from-orange-500 to-amber-500"
    },
    {
        icon: Baby,
        name: "Pediatrics",
        description: "Specialized medical care for infants, children, and adolescents",
        services: ["Well-Child Visits", "Immunizations", "Growth Monitoring", "Developmental Assessments", "Sick Child Care"],
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Thermometer,
        name: "Dermatology",
        description: "Comprehensive skin care and treatment of dermatological conditions",
        services: ["Skin Cancer Screening", "Acne Treatment", "Cosmetic Procedures", "Allergy Testing", "Rash Management"],
        color: "from-pink-500 to-rose-500"
    },
    {
        icon: Stethoscope,
        name: "General Medicine",
        description: "Primary care and comprehensive health management for all ages",
        services: ["Annual Checkups", "Chronic Disease Management", "Preventive Care", "Health Screenings", "Medication Management"],
        color: "from-blue-500 to-cyan-500"
    }
];

const additionalServices = [
    { icon: Activity, name: "Emergency Care", description: "24/7 emergency medical services" },
    { icon: Eye, name: "Ophthalmology", description: "Comprehensive eye care and vision services" },
    { icon: Ear, name: "ENT Services", description: "Ear, nose, and throat specialist care" },
    { icon: Pill, name: "Pharmacy", description: "On-site pharmacy for your convenience" }
];

export default function Services() {
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
                            Medical Services
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We offer a comprehensive range of medical services delivered by experienced healthcare professionals using state-of-the-art technology
                        </p>
                    </motion.div>

                    {/* Main Departments */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {departments.map((dept, index) => (
                            <motion.div
                                key={dept.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                                <dept.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl mb-2">{dept.name}</CardTitle>
                                                <p className="text-gray-600">{dept.description}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                                        <ul className="space-y-2">
                                            {dept.services.map((service) => (
                                                <li key={service} className="flex items-center gap-2 text-gray-600">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${dept.color}`} />
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Additional Services
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {additionalServices.map((service, index) => (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 h-full">
                                        <CardContent className="p-6">
                                            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <service.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold mb-4">Need Medical Assistance?</h2>
                        <p className="text-xl text-blue-50 mb-6 max-w-2xl mx-auto">
                            Our team of experienced healthcare professionals is here to help you with all your medical needs
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="tel:5551234567" className="inline-block">
                                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                                    Call Us: (555) 123-4567
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}