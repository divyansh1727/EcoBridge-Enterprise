import { motion } from "framer-motion";

export default function CTA() {

  return (

    <section id="contact" className="py-24 bg-green-700 text-white">

      <div className="max-w-5xl mx-auto text-center px-6">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: .6 }}
          className="text-5xl font-bold"
        >

          Ready to Build a Greener Future?

        </motion.h2>

        <p className="mt-6 text-xl text-green-100">

          Join EcoBridge today and become a part of a smarter,
          cleaner and more sustainable recycling ecosystem.

        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">

          <button
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >

            Get Started

          </button>

          <button
            className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-700 transition"
          >

            Learn More

          </button>

        </div>

      </div>

    </section>

  );

}