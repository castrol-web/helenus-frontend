import Header from "../components/header/Header";
import { motion } from "framer-motion";
import TeamMembers from "../components/team/TeamMembers";

function About() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white min-h-screen">
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
                        Helenus Agency is a leading recruitment and travel consultancy specializing in overseas job
                        placements and visa application assistance. Our mission is to connect individuals across Africa
                        with life-changing international employment opportunities and to ease the process of visa
                        applications through professional guidance and support.
                    </p>
                </section>

                {/* Our Story Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl text-orange-400 font-semibold mb-4">Our Journey</h2>
                    <p className="text-gray-300 text-md mb-2">
                        Founded in 2023 and officially registered in 2024, Helenus Agency has rapidly grown into a reputable player in the global recruitment space.
                    </p>
                    <p className="text-gray-300">
                        We operate with integrity, transparency, and efficiency to ensure successful outcomes for all our clients.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-12 text-center">
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900/80 backdrop-blur rounded-xl p-8 shadow-md border border-gray-700 hover:border-orange-400 transition"
                    >
                        <h3 className="text-2xl font-semibold text-orange-400 mb-2">Mission</h3>
                        <p className="text-gray-300">
                            At Helenus Agency, our mission is to empower individuals and families by providing reliable, efficient, and ethical immigration, job placement, and visa processing services. We are committed to opening doors of opportunity across Europe, the Gulf, Asia, and Africa, helping our clients achieve their dreams of working and living abroad with confidence and ease.

                        </p>
                    </motion.div>
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-900/80 backdrop-blur rounded-xl p-8 shadow-md border border-gray-700 hover:border-orange-400 transition"
                    >
                        <h3 className="text-2xl font-semibold text-orange-400 mb-2">Vision</h3>
                        <p className="text-gray-300">
                            Our vision is to become a trusted global leader in immigration and employment solutions, known for transforming lives, bridging nations, and setting the standard for excellence in international workforce mobility.
                        </p>
                    </motion.div>
                </section>

                {/* Branches & Team Section */}
                <section className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl text-orange-400 font-semibold mb-6">Branches & Team</h2>
                    <p className="text-gray-300 mb-6">
                        As of <strong>15th May 2025</strong>, Helenus proudly operates two fully functional branches:
                    </p>

                    <div className="space-y-6 text-left text-gray-300">
                        <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition shadow hover:shadow-orange-500/20">
                            <h3 className="text-xl font-bold text-white mb-1">📍 Nairobi (Headquarters)</h3>
                            <p>
                                Located in Kenya’s capital, this branch serves as our central hub for strategic operations and client engagement.
                            </p>
                        </div>
                        <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition shadow hover:shadow-orange-500/20">
                            <h3 className="text-xl font-bold text-white mb-1">📍 Bomet Branch</h3>
                            <p>
                                Focused on delivering services to clients across the South Rift and Western regions with local understanding and care.
                            </p>
                        </div>
                        <div className="bg-gray-700/90 rounded-xl p-6 border border-gray-600 mt-4">
                            <h3 className="text-lg font-semibold text-orange-300 mb-2">👥 Our Team</h3>
                            <p>
                                We’re powered by a passionate team of <strong>17 qualified professionals</strong>, each bringing unique expertise to help our clients succeed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <TeamMembers />
            </div>
        </div>
    );
}

export default About;
