import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBill } from "react-icons/fa";
import axios from "axios";
import Header from "../components/header/Header";
const url = import.meta.env.VITE_SERVER_URL;

type Job = {
    _id: string;
    title: string;
    location: string;
    coverImage: string;
    region: string;
    description: string;
    industry: string;
    employer_name?: string;
    contract_duration?: string;
    salary?: number;
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const AvailableJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [category, setCategory] = useState<string>("All");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const jobsPerPage = 6;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${url}/api/user/jobs`);
                setJobs(res.data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        let filtered = jobs;
        if (category !== "All") {
            filtered = filtered.filter((job) => job.region === category);
        }
        if (search.trim()) {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.location.toLowerCase().includes(search.toLowerCase()) ||
                job.industry.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredJobs(filtered);
        setPage(1);
    }, [search, jobs, category]);

    const categories = ["All", "Africa", "Asia", "Europe", "Gulf"];
    const currentJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return (
        <div>
            <Header pageName={"AVAILABLE JOBS"} />
            <section className="py-12 px-4 md:px-16 bg-gradient-to-br from-blue-50 to-white min-h-screen">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        Explore Available Job Opportunities
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Find overseas jobs posted by verified employers. Click to preview or apply directly.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="input input-bordered w-full md:max-w-md bg-white text-gray-800 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="tabs tabs-boxed bg-black shadow-sm text-slate-50">
                        {categories.map((cat) => (
                            <button
                                type="button"
                                key={cat}
                                className={`tab ${category === cat ? "tab-active text-slate-50" : "hover:text-slate-700"}`}
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 🔄 Loading Spinner */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner text-primary w-12 h-12" />
                    </div>
                ) : (
                    <>
                        {currentJobs.length === 0 ? (
                            <div className="text-center text-gray-500 py-20">
                                <p className="text-lg font-semibold">No jobs found matching your search or filters.</p>
                                <p>Try a different keyword or region.</p>
                            </div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                {currentJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        variants={cardVariants}
                                        className="card shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
                                    >
                                        <figure className="h-52 overflow-hidden">
                                            <img
                                                src={job.coverImage}
                                                alt={job.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading="lazy"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h3 className="card-title text-lg text-blue-800 font-bold">{job.title}</h3>
                                            <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
                                            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt /> <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaBriefcase /> <span>{job.industry}</span>
                                                </div>
                                                {job.contract_duration && (
                                                    <div className="flex items-center gap-2">
                                                        <FaClock /> <span>{job.contract_duration}</span>
                                                    </div>
                                                )}
                                                {job.salary && (
                                                    <div className="flex items-center gap-2">
                                                        <FaMoneyBill /> <span>${job.salary.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-4 flex justify-end">
                                                <Link
                                                    to={`/application/job`} // /apply/${job._id} 
                                                    className="btn btn-sm btn-warning text-white"
                                                >
                                                    Apply Now
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {totalPages > 1 && (
                            <div className="mt-10 flex justify-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        type="button"
                                        key={i + 1}
                                        className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};


export default AvailableJobs;
