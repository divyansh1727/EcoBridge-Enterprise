import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import GeneratorRecycler from "../components/home/GeneratorRecycler";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // If returning from dashboard or auth routes with a scroll request
    if (location.state?.scrollToId) {
      const targetId = location.state.scrollToId;
      
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150); // Slight delay ensures components mount completely

      // Clear layout routing state so it does not jump on reload
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <GeneratorRecycler />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}