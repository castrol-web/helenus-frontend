import { motion } from "framer-motion";
import { FaGlobe, FaSuitcaseRolling } from "react-icons/fa";
import { Link } from "react-router-dom";
import connections from "../assets/connections.jpg"

const AvailableBanner: React.FC = () => {
    return (
        <div className="relative h-[60vh] md:h-[75vh] w-full">
            <img
                src={connections}
                alt="Global Opportunities"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black-/50 backdrop-blur-sm" />
            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex items-center justify-center gap-3 mb-4 text-yellow-400 text-4xl">
                    <FaGlobe />
                    <FaSuitcaseRolling />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                    Discover Global <span className="text-orange-400">Job & Visa</span> Opportunities
                </h1>

                <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl">
                    Find trusted employers and expert visa guidance to unlock your path to working, studying, or migrating abroad.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/opportunities"
                        className="btn btn-warning text-white font-bold px-6"
                    >
                        View Available Jobs
                    </Link>
                    <Link
                        to="/application/visa"
                        className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-900 px-6"
                    >
                        Apply for Visa
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default AvailableBanner;
