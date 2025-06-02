import Header from "../components/header/Header";
import { motion } from "framer-motion";
import { FaPlaneDeparture, FaHotel, FaPassport, FaRoute, FaShieldAlt, } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaPlaneDeparture className="text-4xl text-blue-600" />,
      title: "Flight Booking",
      description: "Book domestic and international flights at competitive prices with real-time availability.",
    },
    {
      icon: <FaHotel className="text-4xl text-blue-600" />,
      title: "Hotel Reservations",
      description: "Choose from a wide range of hotels to suit your budget and style in popular destinations.",
    },
    {
      icon: <FaPassport className="text-4xl text-blue-600" />,
      title: "Visa Assistance",
      description: "We provide guidance and support through the visa application process for various countries.",
    },
    {
      icon: <FaRoute className="text-4xl text-blue-600" />,
      title: "Custom Tour Packages",
      description: "Get tailor-made travel experiences designed just for you—honeymoons, family trips, and more.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Travel Insurance",
      description: "Ensure peace of mind with our comprehensive travel insurance solutions.",
    },
  ];
  return (
    <div>
      <Header pageName={"SERVICES"} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white border border-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services