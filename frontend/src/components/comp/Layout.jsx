/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            {/* Main Content */}
            <main className="min-h-[calc(100vh-200px)]">
                {children}
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}