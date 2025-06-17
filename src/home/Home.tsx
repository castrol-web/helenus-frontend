import BlogContainer from "../components/blog/BlogContainer"
import FAQs from "../components/frequentQuestions/FAQs"
import MainHeader from "../components/header/MainHeader"
import Hero from "../components/hero/Hero"
import HeroSection from "../components/hero/HeroSection"
import StatsView from "../components/stats/StatsView"
import { TestimonialCarousel } from "../components/testimonial/TestimonialCarousel"
import AvailableBanner from "../servic/AvailableBunner"
import ServiceSection from "../servic/ServiceSection"


function Home() {
    return (
        <div className="mx-auto items-center justify-center mb-1">
            <MainHeader />
            <HeroSection />
            <ServiceSection />
            <AvailableBanner />
            <BlogContainer />
            <FAQs />
            <StatsView />
            <TestimonialCarousel />
            <Hero />
        </div>
    )
}

export default Home