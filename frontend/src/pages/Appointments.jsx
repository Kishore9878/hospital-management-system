import { motion } from "framer-motion";
import Layout from "@/components/comp/Layout";
import AppointmentForm from "@/components/comp/AppointmentForm";
export default function Appointments() {

    return (

        <Layout>
            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
                        <p className="text-xl text-gray-600">Schedule your visit with our healthcare professionals</p>
                    </motion.div>
                    <AppointmentForm header />

                </div>
            </div>
        </Layout>
    );
}
