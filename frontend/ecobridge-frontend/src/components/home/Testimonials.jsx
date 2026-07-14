import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaRecycle,
  FaTruck,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

const testimonials = [
  {
    icon: <FaRecycle />,
    title: "Waste Generator",
    company: "Residential & Commercial",
    review:
      "Creating waste listings takes only a few seconds. EcoBridge helped us connect with nearby recyclers without making countless phone calls.",
    accent: "olive",
  },
  {
    icon: <FaTruck />,
    title: "Recycler Partner",
    company: "Verified Recycler",
    review:
      "The intelligent location matching helps us discover nearby waste instantly. Pickup management is now much more organized.",
    accent: "orange",
  },
  {
    icon: <FaBuilding />,
    title: "Recycling Organization",
    company: "Sustainability Partner",
    review:
      "EcoBridge provides a structured workflow that improves coordination between waste generators and recycling partners.",
    accent: "olive",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#101411] py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#7A9B33]/10 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[170px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

            COMMUNITY FEEDBACK

          </span>

          <h2 className="mt-8 text-5xl font-black text-white">

            Trusted Across the

            <span className="text-[#A4B465]"> Recycling </span>

            Ecosystem

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

            EcoBridge is designed to simplify collaboration between
            waste generators, recyclers and sustainability partners.

          </p>

        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => {

            const iconColor =
              item.accent === "orange"
                ? "text-orange-400"
                : "text-[#A4B465]";

            const border =
              item.accent === "orange"
                ? "hover:border-orange-400/40 hover:shadow-[0_0_45px_rgba(249,115,22,.18)]"
                : "hover:border-[#7A9B33]/40 hover:shadow-[0_0_45px_rgba(122,155,51,.18)]";

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .1,
                  duration: .6,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-300 ${border}`}
              >

                <div className="flex items-center justify-between">

                  <FaQuoteLeft className={`text-4xl ${iconColor}`} />

                  <div className="flex gap-1 text-orange-400">

                    {[...Array(5)].map((_, i) => (

                      <FaStar key={i} />

                    ))}

                  </div>

                </div>

                <p className="mt-8 leading-8 text-gray-300">

                  "{item.review}"

                </p>

                <div className="mt-10 flex items-center gap-5">

                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl ${iconColor}`}>

                    {item.icon}

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-white">

                      {item.title}

                    </h3>

                    <p className="text-gray-400">

                      {item.company}

                    </p>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}