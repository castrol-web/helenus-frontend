import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaRegStar, } from 'react-icons/fa';
import testimony1 from '../../assets/testimony1.jpeg';
import testimony2 from '../../assets/testimony2.jpeg';
import testimony3 from '../../assets/testimony3.jpeg';
import testimony4 from '../../assets/testimony4.jpeg';
import testimony5 from '../../assets/testimony5.jpeg';
import testimony6 from '../../assets/testimony6.jpeg';
import testimony7 from '../../assets/testimony7.jpeg';

type Testimonial = {
    title: string;
    quote: string;
    image: string;
    rating: number;
};

export const TestimonialCarousel = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [current, setCurrent] = useState(0);

    const fetchTestimonials = async () => {
        const data: Testimonial[] = [
            {
                title: 'Construction Engineer',
                quote:
                    'Helenus made my international job placement seamless. Their support was outstanding from start to finish.',
                image: testimony2,
                rating: 5,
            },
            {
                title: 'Travel Client',
                quote:
                    'Excellent service! My entire travel process, from visa to flight booking, was handled with care and precision.',
                image: testimony3,
                rating: 4,
            },
            {
                title: 'Student Visa Applicant',
                quote:
                    'Thanks to Helenus, I’m now studying abroad. Their step-by-step guidance made a complex process feel simple.',
                image: testimony1,
                rating: 5,
            },
            {
                title: 'Graduate Applicant',
                quote:
                    'Navigating the visa application process felt overwhelming, but Helenus made it manageable and stress-free.',
                image: testimony4,
                rating: 5,
            },
            {
                title: 'International Student',
                quote:
                    'I was unsure about applying to study overseas, but the Helenus team was patient and incredibly helpful.',
                image: testimony5,
                rating: 4,
            },
            {
                title: 'Family Visa Client',
                quote:
                    'Helenus didn’t just help me with my own visa—they also supported my family’s application. Exceptional service!',
                image: testimony6,
                rating: 4,
            },
            {
                title: 'Scholarship Recipient',
                quote:
                    'Their team helped me with my student visa and provided advice on scholarship applications. Truly grateful.',
                image: testimony7,
                rating: 4,
            },
        ];

        setTestimonials(data);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        const interval = setInterval(next, 8000);
        return () => clearInterval(interval);
    }, [testimonials]);

    if (!testimonials.length)
        return <div className="text-center py-10">Loading testimonials...</div>;

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 py-10">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-blue-600">What Our Clients Say</h2>
                <p className="text-gray-500">Real stories from our happy customers</p>
            </div>

            <div className="relative min-h-[320px]">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={current}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full flex justify-center"
                    >
                        <div className="card bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-3xl w-full">
                            <img
                                src={testimonials[current].image}
                                alt={testimonials[current].title}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-blue-500"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <FaQuoteLeft className="text-blue-400 text-2xl mb-2 mx-auto md:mx-0" />
                                <p className="text-gray-700 italic mb-3">"{testimonials[current].quote}"</p>
                                <div className="flex justify-center md:justify-start mb-1 text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) =>
                                        i < testimonials[current].rating ? (
                                            <FaStar key={i} />
                                        ) : (
                                            <FaRegStar key={i} />
                                        )
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">{testimonials[current].title}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2">
                    <button
                        type='button'
                        title="Previous"
                        onClick={prev}
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
                    >
                        <FaChevronLeft />
                    </button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2">
                    <button
                        type='button'
                        title="Next"
                        onClick={next}
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};
