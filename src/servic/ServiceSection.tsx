import { FaUserGraduate, FaBriefcase, FaUsers, FaCamera, FaHome } from "react-icons/fa";
import alaska from "../assets/alaska.jpg"
import thailand from "../assets/thailand.jpg"
import palawan from "../assets/palawan.jpg"
import ServiceCard from "./ServiceCard";



const visas = [
    {
        title: "",
        description: "We have a tendency to believe the idea that smart looking of any website.",
        imageUrl: alaska,
        Icon: FaCamera ,
    },
    {
        title: "Student Visa",
        description: "Ideal for professionals or entrepreneurs seeking business opportunities.",
        imageUrl: thailand,
        Icon: FaUserGraduate,
    },
    {
        title: "Visit/Tourist Visa",
        description: "Bring your loved ones closer with a hassle-free family visa process.",
        imageUrl: alaska,
        Icon: FaUsers,
    },
    {
        title: "Work Permits",
        description: "Explore the world with a tourist visa tailored to your travel needs.",
        imageUrl: palawan,
        Icon: FaBriefcase ,
    },
    {
        title: "Job Placements Available",
        description: "Settle in with long-term residence support and assistance.",
        imageUrl: thailand,
        Icon: FaHome,
    },
];

const ServiceSection = () => {
    return (
        <section className="px-4 md:px-16 py-10 bg-blue-50">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
                <div className="lg:w-1/2">
                    <p className="uppercase text-sm text-gray-500">What do we offer</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Visa Application Assistance & Job placement Abroad<span className="text-orange-500">services.</span>
                    </h2>
                    <p className="text-gray-600 mt-4 text-clip">
                        Helenus specializes in connecting job seekers to credible opportunities across:
                        Africa – Particularly in Mauritius
                        Asia – With a focus on Malaysia
                        Gulf Countries
                        Europe – Through strong ties with companies in countries such as the Netherlands,
                        among others
                    </p>
                    <p className="text-gray-600 mt-4">
                        We use our experience, skills, and global connections to help clients succeed in their
                        visa applications.
                    </p>
                </div>
                <div className="bg-blue-600 text-white rounded-xl p-6 w-full lg:w-1/3 text-center shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Get visa with 100% success rate</h3>
                    <button type="button" className="btn btn-warning text-white font-bold">Apply Now</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visas.map((visa) => (
                    <ServiceCard key={visa.title} {...visa} />
                ))}
            </div>
        </section>
    );
};

export default ServiceSection;
