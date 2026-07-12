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