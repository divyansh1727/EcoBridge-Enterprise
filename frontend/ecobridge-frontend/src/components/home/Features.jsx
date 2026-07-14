import { motion } from "framer-motion";
import {
  FaRecycle,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaChartLine,
  FaLeaf,
  FaHandshake,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRecycle />,
    title: "Intelligent Waste Matching",
    description:
      "Automatically connect waste generators with the most suitable recycling partners based on waste type and location.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Nearby Recycler Discovery",
    description:
      "Locate verified recyclers around you using smart geo-matching and real-time distance calculations.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainability First",
    description:
      "Reduce landfill waste while encouraging responsible recycling and a cleaner environment.",
  },
  {
    icon: <FaChartLine />,
    title: "Live Activity Tracking",
    description:
      "Track every pickup, request and recycling activity through an intuitive real-time dashboard.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Enterprise Security",
    description:
      "JWT authentication, role-based authorization and secure APIs protect every interaction.",
  },
  {
    icon: <FaHandshake />,
    title: "Community Collaboration",
    description:
      "Bring together citizens, recyclers and organizations into one unified recycling ecosystem.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#101411] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-44 left-0 h-[450px] w-[450px] rounded-full bg-[#7A9B33]/10 blur-[140px]" />

        <div className="absolute bottom-[-180px] right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[170px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

            PLATFORM FEATURES

          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white">

            Built for a
            <span className="text-[#A4B465]"> Smarter </span>

            Recycling Ecosystem

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

            EcoBridge combines intelligent waste matching, secure
            authentication, live analytics and sustainable workflows into one
            modern platform.

          </p>

        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .08,
                duration: .55,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#7A9B33]/50
                hover:shadow-[0_0_45px_rgba(122,155,51,0.18)]
              "
            >

              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#7A9B33]/5 blur-3xl transition-all duration-500 group-hover:bg-orange-500/10" />

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#7A9B33]/15
                  text-3xl
                  text-[#A4B465]
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-orange-500/20
                  group-hover:text-orange-400
                "
              >
                {feature.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">

                {feature.title}

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                {feature.description}

              </p>

              <button
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-[#A4B465]
                  transition-all
                  duration-300
                  group-hover:gap-4
                  group-hover:text-orange-400
                "
              >

                Learn More

                <FaArrowRight />

              </button>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}