import { useParams } from "react-router-dom";
import { FaUserGraduate, FaBriefcase, FaUsers, FaGlobe, FaChalkboardTeacher } from "react-icons/fa";
import thailand from "../assets/thailand.jpg";
import palawan from "../assets/palawan.jpg";
import alaska from "../assets/alaska.jpg";

type ServiceSlug =
  | "student-visa-assistance"
  | "work-visa-applications"
  | "tourist-visit-visas"
  | "job-placements-abroad"
  | "migration-visa-advisory";

const serviceData: Record<ServiceSlug, {
  title: string;
  description: string;
  details: string;
  image: string;
  icon: React.ElementType;
}> = {
  "student-visa-assistance": {
    title: "Student Visa Assistance",
    description: "Comprehensive guidance for students applying to study abroad.",
    details: `We offer full end-to-end assistance in obtaining your student visa, including course selection advice, visa interviews, document preparation, and embassy submission protocols. Our team understands each country's process and ensures you're fully prepared to succeed.`,
    image: thailand,
    icon: FaUserGraduate,
  },
  "work-visa-applications": {
    title: "Work Visa Applications",
    description: "Support for professionals applying for legal employment overseas.",
    details: `Whether you're heading to Europe, Asia, or the Gulf, we help you navigate the complex work visa process. We guide you through legal requirements, paperwork, and provide job-matching opportunities where applicable.`,
    image: palawan,
    icon: FaBriefcase,
  },
  "tourist-visit-visas": {
    title: "Tourist/Visit Visas",
    description: "Stress-free planning and support for your visit abroad.",
    details: `Our consultants ensure your documentation and application meet embassy requirements for a hassle-free travel experience. Whether it's a holiday or visiting family, we make the process smooth and quick.`,
    image: alaska,
    icon: FaUsers,
  },
  "job-placements-abroad": {
    title: "Job Placements Abroad",
    description: "Get matched with reliable employers overseas.",
    details: `Helenus partners with verified employers across sectors in Europe, the Gulf, Asia, and Africa. We assist with applications, resume writing, interview prep, and offer relocation guidance post-placement.`,
    image: thailand,
    icon: FaGlobe,
  },
  "migration-visa-advisory": {
    title: "Migration & Visa Advisory",
    description: "Expert consultancy for long-term migration and PR.",
    details: `From eligibility assessments to application prep, we walk with you through every step of your migration journey. We provide tailored advice for PR, permanent residency, and long-stay visa paths.`,
    image: palawan,
    icon: FaChalkboardTeacher,
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug?: string }>();

  if (!slug || !Object.keys(serviceData).includes(slug)) {
    return <div className="p-10 text-center text-xl">Service not found.</div>;
  }

  const service = serviceData[slug as ServiceSlug];
  const Icon = service.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-28">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Icon className="text-blue-600" /> {service.title}
        </h1>
        <p className="text-lg text-gray-600">{service.description}</p>
      </div>
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
      />
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{service.details}</p>
      </div>
    </div>
  );
}
