import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";

type statType = {
    icon: any;
    end: number;
    title: string;
    description: string;
    color?: string;
};

function StatCard({ icon: Icon, end, title, description, color = "text-blue-500" }: statType) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
        >
            <div className={`mb-4 text-4xl ${color} flex justify-center`}>
                <Icon />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {isInView && <CountUp end={end} duration={2} />}+
            </h3>
            <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
            <p className="text-gray-500 text-sm mt-2">{description}</p>
        </motion.div>
    );
}

export default StatCard;
