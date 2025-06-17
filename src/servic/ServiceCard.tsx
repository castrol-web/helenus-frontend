import { motion} from "framer-motion";
import { useState, type FC } from "react";
import type { IconType } from "react-icons";

interface VisaCardProps {
    title: string;
    imageUrl: string;
    Icon: IconType;
    description: string;
}

const ServiceCard: FC<VisaCardProps> = ({ title, imageUrl, Icon }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-cover bg-center h-64 flex items-end"
            style={{ backgroundImage: `url(${imageUrl})`}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* Rotating Icon */}
            <motion.div
                className="absolute top-4 right-4 bg-orange-500 text-white p-3 rounded-full z-10"
                animate={{ rotate: hovered ? 360 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <Icon className="text-xl" />
            </motion.div>

            {/* Title on background */}
            {!hovered && (
                <div className="text-white font-bold text-xl p-4 bg-black/40 w-full">
                    {title}
                </div>
            )}
        </motion.div>
    );
};

export default ServiceCard;
