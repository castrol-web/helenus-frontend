import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaClipboardCheck, FaSearch, FaCogs, FaCheckCircle, FaPlaneDeparture } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import Header from "../header/Header";

const jobSteps = [
    {
        step: "Step 1",
        title: "Registration or Login",
        summary: "Enter email or password to Login.",
        details: "A user who already has an account can Login directly with correct details or the system will log you in if you had logged in before.If you dont have an account Create one then Verify the email link sent to the provided email then you can proceed to login if you already verified",
        icon: <IoPersonAdd size={24} className="text-orange-500" />
    },
    {
        step: "Step 2",
        title: "Submit Your Application",
        summary: "Begin by submitting your job application form with your resume and cover letter.",
        details: "Ensure your resume is tailored and includes relevant experience. Add certificates and a cover letter to strengthen your profile.",
        icon: <FaClipboardCheck size={24} className="text-green-400" />
    },
    {
        step: "Step 3",
        title: "Initial Review",
        summary: "Our team reviews your application for matching job opportunities.",
        details: "We check your qualifications, skills, and experience against current openings. You may be asked for clarification or additional info.",
        icon: <FaSearch size={24} className="text-green-400" />
    },
    {
        step: "Step 4",
        title: "Processing & Verification",
        summary: "Verification and coordination with prospective employers.",
        details: "Employers are contacted, references may be verified, and interviews scheduled.",
        icon: <FaCogs size={24} className="text-green-400" />
    },
    {
        step: "Step 5",
        title: "Decision Stage",
        summary: "Receive your offer letter or next steps.",
        details: "If successful, you receive an offer letter. Guidance is provided for onboarding.",
        icon: <FaCheckCircle size={24} className="text-green-400" />
    },
    {
        step: "Step 6",
        title: "Finalization & Relocation",
        summary: "We support you with final preparations for relocation.",
        details: "Contracts, flight tickets, and necessary documents are arranged with you.",
        icon: <FaPlaneDeparture size={24} className="text-green-400" />
    }
];

const visaSteps = [
    {
        step: "Step 1",
        title: "Registration or Login",
        summary: "Enter email or password to Login.",
        details: "A user who already has an account can Login directly with correct details or the system will log you in if you had logged in before.If you dont have an account Create one then Verify the email link sent to the provided email then you can proceed to login if you already verified",
        icon: <IoPersonAdd size={24} className="text-orange-500" />
    },
    {
        step: "Step 2",
        title: "Submit Visa Application",
        summary: "Start by filling out the visa application and attaching required documents.",
        details: "Make sure all forms are complete and accurate. Required documents include passport, photos, invitation letters, etc.",
        icon: <FaClipboardCheck size={24} className="text-green-400" />
    },
    {
        step: "Step 3",
        title: "Document Review",
        summary: "Our team reviews your submission to ensure it's complete.",
        details: "We verify that all necessary files are attached and valid. You may be asked to make corrections.",
        icon: <FaSearch size={24} className="text-green-400" />
    },
    {
        step: "Step 4",
        title: "Processing & Verification",
        summary: "Your application is processed with immigration authorities.",
        details: "We submit your documents, track embassy communication, and manage responses.",
        icon: <FaCogs size={24} className="text-green-400" />
    },
    {
        step: "Step 5",
        title: "Visa Decision",
        summary: "Get the outcome of your visa application.",
        details: "We notify you of approval, rejection, or requests for more documentation.",
        icon: <FaCheckCircle size={24} className="text-green-400" />
    },
    {
        step: "Step 6",
        title: "Visa Issuance",
        summary: "Once approved, your visa is printed and delivered.",
        details: "We help you collect your passport and visa, and prepare for travel.",
        icon: <FaPlaneDeparture size={24} className="text-green-400" />
    }
];

export default function ApplicationRoadmap() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'job' | 'visa'>('job');

    const toggle = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const steps = activeTab === 'job' ? jobSteps : visaSteps;

    return (
        <>
            <Header pageName={"APPLICATION ROADMAP"} />
            <div className="max-w-6xl mx-auto p-6">
                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        type="button"
                        onClick={() => setActiveTab('job')}
                        className={`px-4 py-2 rounded-full border ${activeTab === 'job' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        Job Application
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('visa')}
                        className={`px-4 py-2 rounded-full border ${activeTab === 'visa' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        Visa Application
                    </button>
                </div>

                <div className="relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-orange-500 before:transform before:-translate-x-1/2">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`relative z-10 flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            <div className="w-full md:w-1/2 px-4">
                                <div className="bg-gray-800 rounded-xl shadow-lg p-6 relative">
                                    <div className="absolute -top-4 -left-4 bg-green-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow">
                                        {step.step}
                                    </div>
                                    <div className="mb-2">{step.icon}</div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-300">{step.summary}</p>
                                    <button
                                        type="button"
                                        onClick={() => toggle(index)}
                                        className="mt-3 text-green-400 flex items-center gap-1 text-sm hover:underline"
                                    >
                                        {expandedIndex === index ? (
                                            <>
                                                Read less <FaChevronUp size={14} />
                                            </>
                                        ) : (
                                            <>
                                                Read more <FaChevronDown size={14} />
                                            </>
                                        )}
                                    </button>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-gray-400"
                                        >
                                            {step.details}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}