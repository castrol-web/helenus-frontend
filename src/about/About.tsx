import Header from "../components/header/Header";
import { motion } from "framer-motion";
import TeamMembers from "../components/team/TeamMembers";

function About() {
    return (
        <div className="bg-black text-white">
            <Header pageName={"ABOUT US"} />

            <div className="px-6 lg:px-20 py-16 space-y-24">
                {/* Welcome Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-orange-500 mb-4"
                    >
                        Welcome to Helenus Travel Agency
                    </motion.h1>
                    <p className="text-lg text-gray-300">
                        We specialize in crafting unforgettable journeys across the globe.
                        Our mission is to connect you with captivating destinations and exceptional experiences tailored to your dreams.
                    </p>
                </section>

                {/* Our Story Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl text-orange-400 font-semibold mb-4">Our Journey</h2>
                    <p className="text-gray-300 text-md">
                        Founded in 2010 by passionate travelers, Helenus Travel was born from a desire to share the thrill of exploration.
                        Today, we’re known for excellence, trust, and personalized service.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-12 text-center">
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900 rounded-xl p-8 shadow-md border border-gray-700"
                    >
                        <h3 className="text-2xl font-semibold text-orange-400 mb-2">Mission</h3>
                        <p className="text-gray-300">
                            To provide reliable, affordable, and tailored travel experiences, building lifelong client relationships through exceptional service.
                        </p>
                    </motion.div>
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-900 rounded-xl p-8 shadow-md border border-gray-700"
                    >
                        <h3 className="text-2xl font-semibold text-orange-400 mb-2">Vision</h3>
                        <p className="text-gray-300">
                            To become East Africa’s most trusted travel agency, making global experiences accessible through innovation and heart.
                        </p>
                    </motion.div>
                </section>

                {/* Team Section */}
                <TeamMembers />
            </div>
        </div>
    );
}

export default About;
