import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import { motion } from "framer-motion";

const faqs = [
    {
        id: 1,
        question: "What types of visas can Helenus help me apply for?",
        answer: "We assist with various visa types including employment, student, tourist, and permanent residency visas depending on the country of interest."
    },
    {
        id: 2,
        question: "Do you offer job placement services abroad?",
        answer: "Yes, Helenus partners with employers across Europe, the Gulf, Asia, and Africa to help you find legitimate job opportunities abroad."
    },
    {
        id: 3,
        question: "What documents are required to start a visa or job application?",
        answer: "Typical documents include a valid passport, updated CV, certificate of good conduct, national ID, birth certificate, and academic credentials."
    },
    {
        id: 4,
        question: "How long does the application and placement process take?",
        answer: "Timelines vary by country and type of service, but on average, job placements take 4–8 weeks while visa processing may take 2–6 weeks."
    },
    {
        id: 5,
        question: "Do you provide interview preparation or language support?",
        answer: "Yes, we offer mock interview training and basic language preparation for countries that require English, German, French or Arabic proficiency."
    }
];

const FAQs = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20 px-4 md:px-12">
            {/* Animated Geometric Shapes */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-2xl"
            />
            <motion.div
                animate={{ x: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400 rotate-45 opacity-10 blur-xl"
            />
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/4 w-24 h-24 bg-gray-600 rounded-full opacity-10 blur-2xl"
            />

            {/* FAQ Container */}
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Find answers about our visa services, job placement, and travel support.
                </p>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                {faqs.map(({ id, question, answer }) => (
                    <FAQ key={id} question={question} answer={answer} />
                ))}
            </div>
            <div className='relative z-10 items-center justify-center mx-auto hidden gap-7 mt-4'>
                <span className='text-slate-50'>still having another question?</span> <Link to="/questions" className='btn btn-primary'>ask a question</Link>
            </div>
        </section>
    );
};

export default FAQs;

