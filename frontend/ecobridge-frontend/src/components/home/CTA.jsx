import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLeaf, FaRecycle } from "react-icons/fa";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#101411] py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#7A9B33]/10 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[170px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl px-10 py-16 text-center"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#7A9B33]/15 text-4xl text-[#A4B465]">

            <FaLeaf />

          </div>

          <span className="mt-8 inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

            JOIN THE MOVEMENT

          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white">

            Build a

            <span className="text-[#A4B465]"> Cleaner </span>

            Tomorrow,

            <br />

            Starting Today.

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

            Join EcoBridge and become part of a growing community
            transforming waste into sustainable opportunities through
            intelligent recycling.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="inline-flex items-center gap-3 rounded-xl bg-[#7A9B33] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#91B03A]"
            >

              Get Started

              <FaArrowRight />

            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-orange-400 hover:bg-orange-500/10"
            >

              <FaRecycle />

              Explore Platform

            </Link>

          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">

            <div>

              <h3 className="text-4xl font-black text-[#A4B465]">

                24×7

              </h3>

              <p className="mt-2 text-gray-400">

                Platform Availability

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-orange-400">

                Secure

              </h3>

              <p className="mt-2 text-gray-400">

                JWT Authentication

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-[#A4B465]">

                Smart

              </h3>

              <p className="mt-2 text-gray-400">

                Geo-Matching Engine

              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}