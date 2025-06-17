import { FaUserGraduate, FaBriefcase, FaUsers, FaGlobe, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import alaska from "../assets/alaska.jpg";
import student from "../assets/student.jpeg";
import work from "../assets/work.jpg"
import job from "../assets/job.jpg";
import migration from "../assets/migration.jpg";
import ServiceCard from "./ServiceCard";

const visas = [
  {
    title: "Student Visa Assistance",
    description: "Comprehensive guidance for students applying to study abroad, including documentation, interviews, and embassy protocols.",
    imageUrl: student,
    Icon: FaUserGraduate,
    slug: "student-visa-assistance",
  },
  {
    title: "Work Visa Applications",
    description: "Secure legal authorization to work overseas with full application support tailored to your profession and target country.",
    imageUrl: work,
    Icon: FaBriefcase,
    slug: "work-visa-applications",
  },
  {
    title: "Tourist/Visit Visas",
    description: "Enjoy a seamless experience traveling abroad with our assistance in acquiring visit or tourist visas.",
    imageUrl: alaska,
    Icon: FaUsers,
    slug: "tourist-visit-visas",
  },
  {
    title: "Job Placements Abroad",
    description: "Get matched with trusted international employers in Europe, Asia, Africa, and the Gulf. Includes interview prep and CV optimization.",
    imageUrl: job,
    Icon: FaGlobe,
    slug: "job-placements-abroad",
  },
  {
    title: "Migration & Visa Advisory",
    description: "Country-specific visa consultancy and advisory services for PR, citizenship, and migration planning.",
    imageUrl: migration,
    Icon: FaChalkboardTeacher,
    slug: "migration-visa-advisory",
  },
];

const ServiceSection = () => {
  return (
    <section className="px-4 md:px-16 py-10 bg-blue-50">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div className="lg:w-1/2">
          <p className="uppercase text-sm text-gray-500">What do we offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Visa Application Assistance & Job Placement Abroad <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Helenus connects job seekers to credible opportunities and provides expert visa application support across:
            <br />• Africa – Especially Mauritius
            <br />• Asia – Focused on Malaysia
            <br />• Gulf Countries
            <br />• Europe – With partnerships in the Netherlands and beyond
          </p>
          <p className="text-gray-600 mt-4">
            We use our experience, skills, and global network to help clients succeed in their visa applications and job searches.
          </p>
        </div>
        <div className="bg-blue-600 text-white rounded-xl p-6 w-full lg:w-1/3 text-center shadow-md">
          <h3 className="text-xl font-semibold mb-2">Get your visa with a 100% success mindset</h3>
          <Link type="button" to="/application/visa" className="btn btn-warning text-white font-bold">Apply Now</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <Link to={`/services/${visa.slug}`} key={visa.slug}>
            <ServiceCard {...visa} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
