import { motion } from "framer-motion";
import {
  FaUpload,
  FaSearchLocation,
  FaHandshake,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload />,
    title: "Create a Waste Listing",
    description:
      "Generators upload recyclable waste with quantity, images and pickup location.",
    color: "text-[#A4B465]",
  },
  {
    icon: <FaSearchLocation />,
    title: "Intelligent Geo-Matching",
    description:
      "EcoBridge automatically discovers the nearest compatible recycling partners.",
    color: "text-orange-400",
  },
  {
    icon: <FaHandshake />,
    title: "Reserve Instantly",
    description:
      "Verified recyclers browse available waste and reserve pickups in seconds.",
    color: "text-[#A4B465]",
  },
  {
    icon: <FaTruck />,
    title: "Pickup & Recycling",
    description:
      "Waste is collected, recycled and the platform updates the activity in real time.",
    color: "text-orange-400",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#101411] py-28"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#7A9B33]/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[150px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >

          <span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

            SIMPLE WORKFLOW

          </span>

          <h2 className="mt-8 text-5xl font-black text-white">

            From Waste to
            <span className="text-[#A4B465]"> Sustainable </span>

            Impact

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

            EcoBridge simplifies the recycling journey by intelligently
            connecting waste generators with nearby recyclers through one
            seamless workflow.

          </p>

        </motion.div>

        <div className="relative mt-24">

          {/* Desktop Line */}

          <div className="absolute left-0 right-0 top-12 hidden lg:block">

            <div className="mx-auto h-1 max-w-5xl rounded-full bg-white/10">

              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#7A9B33] via-orange-400 to-[#7A9B33]" />

            </div>

          </div>

          <div className="grid gap-10 md: xl:grid-cols-4">

            {steps.map((step, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .15,
                  duration: .6,
                }}
                whileHover={{
                  y: -12,
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
                  hover:border-[#7A9B33]/40
                  hover:shadow-[0_0_45px_rgba(122,155,51,.20)]
                "
              >

                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 font-bold text-[#C7D59F]">

                  {index + 1}

                </div>

                <div
                  className={`
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white/5
                    text-4xl
                    ${step.color}
                    transition-all
                    duration-300
                    group-hover:rotate-6
                    group-hover:scale-110
                  `}
                >

                  {step.icon}

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">

                  {step.title}

                </h3>

                <p className="mt-5 leading-8 text-gray-400">

                  {step.description}

                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-[#A4B465] transition-all duration-300 group-hover:gap-4 group-hover:text-orange-400">

                  Step {index + 1}

                  <FaArrowRight />

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}