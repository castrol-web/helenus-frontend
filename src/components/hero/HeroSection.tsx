import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import alaska from "../../assets/alaska.jpg"
import palawan from "../../assets/palawan.jpg";
import Alex from "../../assets/Alex.jpeg"



const HeroSection = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-white gap-12">
            {/* Left - Images */}
            <div className="relative w-full lg:w-1/2">
                <motion.img
                    src={alaska}
                    alt="Happy Clients"
                    className="rounded-2xl w-full shadow-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                />
                <motion.img
                    src={palawan}
                    alt="Consulting"
                    className="absolute bottom-[-40px] left-[30px] w-1/2 rounded-xl shadow-lg border-4 border-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                />
            </div>

            {/* Right - Text */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome to Helenus <br />
                    Visa, Travel & Jobs Agency
                </motion.h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                    Helenus Agency is dedicated to facilitating visa processing,Job recruitment in Europe(Netherlands,Denmark) Gulf(Qatar,Dubai,Saudi Arabia) Africa(Mauritius) Asia(Malaysia),Tours and Travels and Flight Reservation.
                    Our commitment is to ensure a smooth,efficient pathway for individuals seeking opportunities overseas.

                </p>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start gap-6 mt-4">
                    <div className="text-center">
                        <div className="radial-progress text-primary" data-value="85">
                            85%
                        </div>
                        <p className="mt-2 font-semibold text-sm">Visa Success</p>
                    </div>
                    <div className="text-center">
                        <div className="radial-progress text-secondary" data-value="95">
                            95%
                        </div>
                        <p className="mt-2 font-semibold text-sm">Client Satisfaction</p>
                    </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mt-6">
                    {[
                        "Global Job Placement Support",
                        "Online Interview & Guidance",
                        "Student & Work Visa Consulting",
                        "99% Success Rate for Eligible Clients",
                    ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                            <FaCheckCircle className="text-green-500" /> {item}
                        </li>
                    ))}
                </ul>

                {/* Call to Action */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                    <button type="button" className="btn btn-primary px-6">About Us</button>
                    <div className="flex items-center gap-2">
                        <img
                            src={Alex}
                            alt="Founder"
                            className="w-10 h-10 rounded-full border"
                        />
                        <div className="text-sm text-left">
                            <p className="font-semibold">Alex</p>
                            <p className="text-xs text-gray-500">Founder & CEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
