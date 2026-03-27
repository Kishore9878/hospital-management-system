import React, { useState, useEffect } from 'react';

// --- Reusable Modal Component (Handles Auth and Doctor Details) ---
const ReusableModal = ({ modalContent, onClose }) => {
    // Determine if modal should be open and what content mode to use
    const isOpen = !!modalContent;
    const mode = modalContent?.type;
    const data = modalContent?.data;

    // Internal state for Auth mode (only relevant if mode is 'auth')
    const [authMode, setAuthMode] = useState('login');

    // State for controlling the mount/unmount and the animation (for smooth transition)
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [showContent, setShowContent] = useState(false);

    // Effect to handle the mounting and unmounting with a delay
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true); // Mount the component immediately
            // Short delay (10ms) to allow component to render before starting fade/scale transition in
            setTimeout(() => setShowContent(true), 10);
        } else {
            setShowContent(false); // Start fade/scale transition out
            // Wait for the transition (300ms) to finish before unmounting (to ensure animation plays)
            setTimeout(() => {
                setShouldRender(false);
                setAuthMode('login'); // Reset auth mode on close
            }, 300);
        }
    }, [isOpen]);

    // Do not render the component if it shouldn't be visible
    if (!shouldRender) return null;

    // Dynamic classes based on animation state
    const backdropClass = showContent ? 'opacity-100' : 'opacity-0';
    const contentClass = showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0';

    // Dynamic Modal Size based on content
    const sizeClass = mode === 'auth'
        ? 'max-w-lg'
        : mode === 'doctor'
            ? 'max-w-4xl' // Increased size for detailed doctor profile
            : 'max-w-xl';

    // --- Inner Components for Modal Content ---

    // Component for Login/Register Forms
    const AuthView = () => {
        const handleAuthModeToggle = () => {
            setAuthMode(prevMode => (prevMode === 'login' ? 'register' : 'login'));
        };

        return (
            <div className="pt-4">
                <div className="text-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-blue mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 9.293a1 1 0 00-1.414-1.414L12 11.586l-2.293-2.293a1 1 0 10-1.414 1.414L10.586 13l-2.293 2.293a1 1 0 101.414 1.414L12 14.414l2.293 2.293a1 1 0 001.414-1.414L13.414 13l2.293-2.293z" clipRule="evenodd" />
                    </svg>
                    <h3 id="modal-title" className="text-3xl font-extrabold text-primary-blue">Patient Portal Access</h3>
                </div>

                {/* Login Form */}
                <form id="login-form" className={`space-y-6 transition-opacity duration-300 ${authMode === 'login' ? 'opacity-100 block' : 'opacity-0 hidden'}`} onSubmit={(e) => e.preventDefault()}>
                    <h4 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h4>

                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
                        <input type="email" id="login-email" name="email" placeholder="patient@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green shadow-sm" required />
                    </div>

                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                        <input type="password" id="login-password" name="password" placeholder="••••••••" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green shadow-sm" required />
                    </div>

                    <button type="submit" className="w-full bg-secondary-green hover:bg-emerald-700 text-white font-bold py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.01]">
                        Log In
                    </button>
                </form>

                {/* Register Form */}
                <form id="register-form" className={`space-y-6 transition-opacity duration-300 ${authMode === 'register' ? 'opacity-100 block' : 'opacity-0 hidden'}`} onSubmit={(e) => e.preventDefault()}>
                    <h4 className="text-2xl font-bold text-gray-800 text-center mb-6">Create New Account</h4>

                    <div>
                        <label htmlFor="register-name" className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
                        <input type="text" id="register-name" name="name" placeholder="Jane Smith" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue shadow-sm" required />
                    </div>

                    <div>
                        <label htmlFor="register-email" className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
                        <input type="email" id="register-email" name="email" placeholder="jane.smith@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue shadow-sm" required />
                    </div>

                    <div>
                        <label htmlFor="register-password" className="block text-sm font-medium text-gray-800 mb-1">Password (Min 6 characters)</label>
                        <input type="password" id="register-password" name="password" placeholder="••••••••" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue shadow-sm" minLength="6" required />
                    </div>

                    <button type="submit" className="w-full bg-primary-blue hover:bg-indigo-700 text-white font-bold py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.01]">
                        Register Account
                    </button>
                </form>

                {/* Switcher Link */}
                <div className="mt-8 text-center text-gray-600">
                    <p id="auth-toggle-text" className="inline text-sm">
                        {authMode === 'login' ? "Don't have an account?" : "Already registered?"}
                    </p>
                    <button
                        id="auth-toggle-button"
                        onClick={handleAuthModeToggle}
                        className="text-primary-blue hover:text-secondary-green font-semibold ml-2 transition duration-200 text-sm"
                    >
                        {authMode === 'login' ? "Register" : "Login"}
                    </button>
                </div>
            </div>
        );
    };

    // Component for Doctor Details
    const DoctorDetailsView = ({ doctor }) => (
        <div className="text-left space-y-6">
            <h3 className="text-3xl font-extrabold text-primary-blue border-b pb-4 mb-6">Physician Profile: {doctor.name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Doctor Card (Left Column) */}
                <div className="md:col-span-1 flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-32 h-32 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue text-3xl font-bold mb-4 border-4 border-primary-blue/50">
                        {doctor.imgText}
                    </div>
                    <p className="text-xl text-secondary-green font-semibold mt-1 text-center">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500 mt-2 text-center">{doctor.bio}</p>
                </div>

                {/* Details (Right Column) */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h5 className="text-xl font-bold text-primary-blue mb-2">Biography</h5>
                        <p className="text-md text-gray-700 leading-relaxed">{doctor.fullBio}</p>
                    </div>

                    <div>
                        <h5 className="text-xl font-bold text-primary-blue mb-2">Clinical Focus Areas</h5>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                            {doctor.focusAreas.map((area, i) => <li key={i}>{area}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            <button onClick={onClose} className="w-full mt-8 bg-secondary-green hover:bg-emerald-700 text-white font-bold py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.01]">
                Book Consultation with {doctor.name}
            </button>
        </div>
    );

    // --- Main Modal Structure ---

    let content;
    if (mode === 'auth') {
        content = <AuthView />;
    } else if (mode === 'doctor' && data) {
        content = <DoctorDetailsView doctor={data} />;
    } else {
        return null;
    }

    return (
        <div
            id="reusable-modal-backdrop"
            // Backdrop styling and animation (note the transition-opacity duration-300)
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 bg-gray-900/90 ${backdropClass}`}
            onClick={(e) => { if (e.target.id === 'reusable-modal-backdrop') onClose(); }}
        >
            <div
                // Content styling and animation (note the transform transition-all duration-300 ease-out)
                className={`relative w-full ${sizeClass} mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10 transform transition-all duration-300 ease-out ${contentClass}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Content based on mode */}
                {content}

            </div>
        </div>
    );
};


// --- Main App Component ---
const Modal = () => {
    // State for UI elements
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State: holds the content to display in the modal
    const [modalContent, setModalContent] = useState(null);

    // --- Utility Functions ---

    // Handles smooth scrolling to sections and closes mobile menu
    const handleSmoothScroll = (e, id) => {
        e.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    // Toggles the Modal visibility
    const toggleModal = (content = null) => {
        setModalContent(content);
    };

    // Helper to open doctor profile
    const openDoctorProfile = (doctor) => {
        toggleModal({ type: 'doctor', data: doctor });
    };


    // --- useEffect Hooks for Side Effects ---

    // 1. Handles Sticky Header shadow effect on scroll
    useEffect(() => {
        const header = document.getElementById('main-header');
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Handles body overflow when modal is open
    useEffect(() => {
        if (modalContent) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [modalContent]);


    // Data for Doctor Cards (Updated with full details)
    const doctors = [
        {
            name: "Dr. Elara Vance",
            specialty: "Lead Cardiologist",
            bio: "Specializing in minimally invasive cardiac procedures and preventative care.",
            imgText: "EV", // Shorter text for placeholder
            fullBio: "Dr. Vance is a board-certified cardiologist with over 15 years of experience in advanced heart failure management and interventional procedures. She leads our department in adopting the latest preventative techniques and patient education programs. Her philosophy centers on empowering patients through comprehensive health knowledge, ensuring every patient understands their treatment plan and long-term wellness strategy. She is widely published in major medical journals.",
            focusAreas: ["Interventional Cardiology", "Preventative Heart Disease", "Advanced Heart Failure Management", "Non-Invasive Diagnostics", "Patient Education"]
        },
        {
            name: "Dr. Marcus Reed",
            specialty: "Chief Orthopedic Surgeon",
            bio: "Pioneering robot-assisted joint replacements and sports injury recovery.",
            imgText: "MR",
            fullBio: "A recognized expert in complex trauma and sports medicine, Dr. Reed pioneered several robot-assisted surgical techniques now used worldwide. He focuses on rapid recovery protocols to get athletes and active individuals back to peak performance safely and quickly. His dedication to rehabilitation and minimal scarring techniques sets him apart in his field.",
            focusAreas: ["Robot-Assisted Joint Replacement", "Sports Medicine & ACL Repair", "Complex Fracture Surgery", "Arthroscopic Surgery", "Physical Therapy Integration"]
        },
        {
            name: "Dr. Sophia Lin",
            specialty: "Pediatric Neurologist",
            bio: "Focused on developmental neurology and child-centered care.",
            imgText: "SL",
            fullBio: "Dr. Lin brings a gentle, specialized approach to diagnosing and treating neurological disorders in children and adolescents. Her practice is built on the belief that early, accurate intervention is critical for healthy development. She frequently collaborates with developmental psychologists and therapists to provide holistic care for conditions like epilepsy and developmental delays.",
            focusAreas: ["Developmental Delay Assessment", "Epilepsy and Seizure Disorders", "Pediatric Migraines", "Autism Spectrum Disorder Consultation", "Genetic Neurological Syndromes"]
        },
    ];

    // Data for Service Cards
    const services = [
        {
            title: "Cardiology", description: "Expert heart care, diagnostics, and surgical interventions.", icon: (props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            )
        },
        {
            title: "Neurology", description: "Advanced treatment for brain, spine, and nervous system disorders.", icon: (props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l6-3" /></svg>
            )
        },
        {
            title: "Orthopedics", description: "Joint replacement, sports medicine, and trauma care.", icon: (props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 4l-2 2m0 0l-2-2m2 2V3" /></svg>
            )
        },
        {
            title: "Pediatrics", description: "Gentle and specialized care for infants, children, and teens.", icon: (props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
            )
        },
    ];


    // --- JSX Rendering ---

    return (
        <div className="font-sans bg-bg-light text-gray-800">
            {/* Tailwind utility classes for theme colors */}
            <style>
                {`
                    :root {
                        --color-primary-blue: #1e3a8a; /* Indigo-800 Dark Blue */
                        --color-secondary-green: #059669; /* Emerald-600 Green */
                    }
                    .text-primary-blue { color: var(--color-primary-blue); }
                    .bg-primary-blue { background-color: var(--color-primary-blue); }
                    .hover\\:bg-primary-blue:hover { background-color: var(--color-primary-blue); }
                    .text-secondary-green { color: var(--color-secondary-green); }
                    .bg-secondary-green { background-color: var(--color-secondary-green); }
                    .hover\\:bg-secondary-green:hover { background-color: var(--color-secondary-green); }
                    .focus\\:border-secondary-green:focus { border-color: var(--color-secondary-green); }
                    .focus\\:ring-secondary-green:focus { --tw-ring-color: var(--color-secondary-green); }
                    .border-primary-blue { border-color: var(--color-primary-blue); }
                `}
            </style>


            {/* Header (Navigation Bar) */}
            <header id="main-header" className="header-fixed fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 9.293a1 1 0 00-1.414-1.414L12 11.586l-2.293-2.293a1 1 0 10-1.414 1.414L10.586 13l-2.293 2.293a1 1 0 101.414 1.414L12 14.414l2.293 2.293a1 1 0 001.414-1.414L13.414 13l2.293-2.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-2xl font-extrabold text-primary-blue">UnityCare</span>
                    </a>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden lg:flex space-x-6 text-gray-600 font-medium">
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-secondary-green transition duration-200">Services</a>
                        <a href="#doctors" onClick={(e) => handleSmoothScroll(e, 'doctors')} className="hover:text-secondary-green transition duration-200">Our Doctors</a>
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-secondary-green transition duration-200">About Us</a>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-secondary-green transition duration-200">Contact</a>
                    </nav>

                    {/* Appointment and Account Buttons (Desktop) */}
                    <div className="flex space-x-3 items-center">
                        <button
                            id="open-auth-modal"
                            onClick={() => toggleModal({ type: 'auth' })}
                            className="bg-primary-blue hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 hidden sm:block"
                        >
                            Account
                        </button>
                        <a href="#appointment" onClick={(e) => handleSmoothScroll(e, 'appointment')} className="bg-secondary-green hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 hidden sm:block">
                            Book Appointment
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-md text-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div id="mobile-menu" className={`lg:hidden bg-white px-4 pb-3 border-t border-gray-100 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-md">Services</a>
                    <a href="#doctors" onClick={(e) => handleSmoothScroll(e, 'doctors')} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-md">Our Doctors</a>
                    <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-md">About Us</a>
                    <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-md">Contact</a>
                    <button onClick={() => toggleModal({ type: 'auth' })} className="mt-3 block text-center bg-primary-blue hover:bg-indigo-700 text-white font-semibold py-2 rounded-full transition duration-300 w-full">
                        Account
                    </button>
                    <a href="#appointment" onClick={(e) => handleSmoothScroll(e, 'appointment')} className="mt-3 block text-center bg-secondary-green hover:bg-emerald-700 text-white font-semibold py-2 rounded-full transition duration-300">
                        Book Appointment
                    </a>
                </div>
            </header>

            <main className="pt-20">
                {/* 1. Hero Section */}
                <section id="hero" className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                        {/* Content */}
                        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                            <span className="text-secondary-green font-semibold text-sm uppercase tracking-wider block mb-3">Your Health, Our Priority</span>
                            <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-blue leading-tight mb-6">
                                Leading the Future of <span className="text-secondary-green">Patient Care.</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                                UnityCare Medical Center provides world-class technology, compassionate experts, and personalized treatment plans right here in your community.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                                {/* Enhanced CTA Button Color */}
                                <a href="#appointment" onClick={(e) => handleSmoothScroll(e, 'appointment')} className="bg-primary-blue hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105">
                                    Book Online Now
                                </a>
                                <a href="#doctors" onClick={(e) => handleSmoothScroll(e, 'doctors')} className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                                    Find a Doctor
                                </a>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="lg:w-1/2">
                            <img
                                src="https://placehold.co/600x400/1e3a8a/ffffff?text=Modern+Hospital+Facility"
                                alt="Modern hospital facility interior"
                                className="w-full h-auto object-cover rounded-3xl shadow-2xl transition duration-500 hover:shadow-primary-blue/50"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1e3a8a/ffffff?text=UnityCare+Facility'; }}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Services Section */}
                <section id="services" className="py-16 sm:py-24 bg-bg-light">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-extrabold text-primary-blue mb-4">Our Specialized Services</h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">Providing comprehensive care across all major medical disciplines.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                    <service.icon className="h-10 w-10 text-secondary-green mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-primary-blue mb-3">{service.title}</h3>
                                    <p className="text-gray-600 text-sm">{service.description}</p>
                                    <a href="#" className="mt-4 inline-block text-secondary-green hover:underline text-sm font-semibold">Learn More &rarr;</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Find a Doctor Section */}
                <section id="doctors" className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-primary-blue mb-4">Meet Our Top Specialists</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Compassionate, board-certified physicians dedicated to your wellness.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {doctors.map((doctor, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl">
                                    <img
                                        src={`https://placehold.co/600x400/059669/ffffff?text=${doctor.imgText}`}
                                        alt={`Portrait of ${doctor.name}`}
                                        className="w-full h-56 object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/059669/ffffff?text=${doctor.imgText}`; }}
                                    />
                                    <div className="p-6 text-center">
                                        <h3 className="text-2xl font-bold text-primary-blue">{doctor.name}</h3>
                                        <p className="text-secondary-green font-semibold mt-1">{doctor.specialty}</p>
                                        <p className="text-gray-600 text-sm mt-3">{doctor.bio}</p>

                                        {/* Updated to open modal with doctor details */}
                                        <button
                                            onClick={() => openDoctorProfile(doctor)}
                                            className="mt-4 inline-block bg-primary-blue text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Why Choose Us Section (Features) */}
                <section id="about" className="py-16 sm:py-24 bg-primary-blue text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="lg:order-2">
                                <img
                                    src="https://placehold.co/600x400/4f46e5/ffffff?text=High-Tech+Equipment"
                                    alt="High-tech medical equipment"
                                    className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/4f46e5/ffffff?text=Modern+Technology'; }}
                                />
                            </div>
                            <div className="lg:order-1 text-center lg:text-left">
                                <span className="text-secondary-green font-semibold text-sm uppercase tracking-wider block mb-3">Our Commitment</span>
                                <h2 className="text-4xl font-extrabold mb-6">Why Patients Choose UnityCare</h2>
                                <ul className="space-y-4 text-lg text-indigo-100">
                                    <li className="flex items-start lg:items-center space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.24a1 1 0 00-1.288-1.288l-6.842 6.842-3.142-3.142a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l8.25-8.25z" />
                                        </svg>
                                        <span>**Award-Winning Physicians:** Recognized nationally for clinical excellence and groundbreaking research.</span>
                                    </li>
                                    <li className="flex items-start lg:items-center space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>**Cutting-Edge Technology:** Equipped with the latest MRI, surgical robotics, and diagnostic tools.</span>
                                    </li>
                                    <li className="flex items-start lg:items-center space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v5l-3 3v-3c-1.657 0-3-.895-3-2s1.343-2 3-2zM12 8V4m0 0a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                        <span>**Patient-Centered Approach:** Focused on comfort, dignity, and clear communication throughout your journey.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Appointment/Contact Form */}
                <section id="appointment" className="py-16 sm:py-24 bg-bg-light">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border-t-8 border-secondary-green">
                            <h2 className="text-3xl font-extrabold text-primary-blue mb-6 text-center">Request an Appointment</h2>
                            <p className="text-gray-600 mb-8 text-center">Fill out the form below and one of our scheduling specialists will contact you within one business day.</p>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" id="name" name="name" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" id="email" name="email" placeholder="john.doe@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green" required />
                                    </div>
                                    <div>
                                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Preferred Department</label>
                                        <select id="department" name="department" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green bg-white" required>
                                            <option>General Practice</option>
                                            <option>Cardiology</option>
                                            <option>Orthopedics</option>
                                            <option>Pediatrics</option>
                                            <option>Emergency Services</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Brief Description of Need</label>
                                    <textarea id="message" name="message" rows="4" placeholder="Describe your symptoms or reason for visit..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-secondary-green focus:border-secondary-green" required></textarea>
                                </div>

                                {/* Enhanced Submit Button Color */}
                                <button type="submit" className="w-full bg-secondary-green hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01]">
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer id="contact" className="bg-primary-blue text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* About */}
                        <div>
                            <h4 className="text-xl font-bold mb-4 text-secondary-green">UnityCare</h4>
                            <p className="text-indigo-200 text-sm">Committed to providing exceptional, whole-person healthcare to our community since 1995. Your trusted partner in wellness.</p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-indigo-200 text-sm">
                                <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition duration-200">Our Services</a></li>
                                <li><a href="#doctors" onClick={(e) => handleSmoothScroll(e, 'doctors')} className="hover:text-white transition duration-200">Physician Directory</a></li>
                                <li><button onClick={() => toggleModal({ type: 'auth' })} className="hover:text-white transition duration-200">Patient Portal Login</button></li>
                                <li><a href="#" className="hover:text-white transition duration-200">Careers</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-indigo-200 text-sm">
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>123 Medical Drive, Health City, 12345</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>(555) 555-UNIT</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 7.8A9 9 0 0112 21a9 9 0 01-7.07-3.17M12 2a9 9 0 019 9c0 5.25-5 9.77-9 15.65-4-5.88-9-10.4-9-15.65a9 9 0 019-9z" /></svg>
                                    <span>info@unitycare.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Emergency */}
                        <div className="p-4 bg-indigo-700/50 rounded-lg shadow-inner">
                            <h4 className="text-2xl font-extrabold mb-2 text-red-400">EMERGENCY</h4>
                            <p className="text-4xl font-bold mb-3">911</p>
                            <p className="text-indigo-200 text-sm">For immediate medical emergencies, call 911 or visit our 24/7 Emergency Room.</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-indigo-700 pt-6 text-center text-sm text-indigo-300">
                        &copy; 2024 UnityCare Medical Center. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Render the Reusable Modal */}
            <ReusableModal modalContent={modalContent} onClose={() => toggleModal(null)} />
        </div>
    );
}

export default Modal;
