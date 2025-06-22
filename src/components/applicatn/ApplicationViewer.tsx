import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { BadgeCheck, Clock, XCircle, FileText } from "lucide-react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInbox } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
const url = import.meta.env.VITE_SERVER_URL;
import logo from "../../assets/logo.jpeg";

type ApplicationStatus = "pending" | "approved" | "rejected";

type Application = {
    id: string;
    type: "Visa" | "Job";
    status: ApplicationStatus;
    applicantName: string;
    dateSubmitted: string;
    referenceNumber: string;
    documentUrl?: string;
    approvedBy?: string;
};

const statusStyles = {
    approved: "text-green-600 bg-green-100 border-green-300",
    pending: "text-yellow-600 bg-yellow-100 border-yellow-300",
    rejected: "text-red-600 bg-red-100 border-red-300",
};

const ApplicationViewer: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login", { state: { from: location } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    useEffect(() => {
        const getMyApplications = async () => {
            if (!user?.token) return;

            try {
                const response = await axios.get(`${url}/api/user/my-applications`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.status === 201) {
                    setApplications(response.data);
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    toast.error("Session expired. Please log in again.");
                    setTimeout(() => navigate("/login"), 1500);
                }
                console.log(error);
            }
        };

        getMyApplications();
    }, [user?.token]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto p-6 relative space-y-10 my-16"
        >
            <div className="absolute inset-0 opacity-15 pointer-events-none select-none flex justify-center items-center">
                <img src={logo} alt="Watermark" className="w-72 h-72 object-contain" />
            </div>

            {applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
                    {/* Icon + Message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 max-w-sm w-full"
                    >
                        <FaInbox size={48} className="mx-auto mb-4 text-gray-500" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Applications Found</h2>
                        <p className="text-gray-400">You haven’t started any visa or job applications yet.</p>
                    </motion.div>

                    {/* Call to Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/application/job" className="btn btn-primary px-6">
                            Apply for Job
                        </Link>
                        <Link to="/application/visa" className="btn btn-warning px-6">
                            Apply for Visa
                        </Link>
                    </motion.div>
                </div>

            ) : (
                applications.map((app) => {
                    const statusIcon = {
                        approved: <BadgeCheck className="text-green-500 w-6 h-6" />,
                        pending: <Clock className="text-yellow-500 w-6 h-6" />,
                        rejected: <XCircle className="text-red-500 w-6 h-6" />,
                    }[app.status];

                    return (
                        <div key={app.id} className="bg-white rounded-2xl shadow-xl border p-6 relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {app.type} Application - {app.applicantName}
                                    </h2>
                                    <p className="text-sm text-gray-500">Submitted on: {new Date(app.dateSubmitted).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Ref No: {app.referenceNumber}</p>
                                </div>

                                <div className={`badge border ${statusStyles[app.status]} text-sm p-3`}>
                                    <div className="flex items-center gap-2">
                                        {statusIcon}
                                        <span className="capitalize font-semibold">{app.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <ul className="steps steps-vertical lg:steps-horizontal w-full">
                                    <li className="step step-primary">Submitted</li>
                                    <li className={`step ${app.status !== "pending" ? "step-primary" : ""}`}>
                                        Under Review
                                    </li>
                                    <li
                                        className={`step ${app.status === "approved"
                                            ? "step-primary"
                                            : app.status === "rejected"
                                                ? "step-error"
                                                : ""
                                            }`}
                                    >
                                        {app.status === "rejected" ? "Rejected" : "Decision"}
                                    </li>
                                </ul>
                            </div>

                            {app.status === "approved" && app.approvedBy && (
                                <div className="mb-4 text-green-700 font-medium">
                                    ✅ Approved by: {app.approvedBy}
                                </div>
                            )}

                            {app.documentUrl ? (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Official Document
                                    </h3>
                                    <a
                                        href={app.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline btn-sm mt-2"
                                    >
                                        View Document
                                    </a>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No document uploaded yet.</p>
                            )}
                        </div>
                    );
                })
            )}

            <ToastContainer />
        </motion.div>
    );
};

export default ApplicationViewer;
