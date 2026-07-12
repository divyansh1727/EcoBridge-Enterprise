import { motion } from "framer-motion";
import {
  FaUpload,
  FaSearchLocation,
  FaHandshake,
  FaTruck,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload />,
    title: "Generator Uploads Waste",
    description:
      "Publish recyclable waste with images, quantity, and pickup location.",
  },
  {
    icon: <FaSearchLocation />,
    title: "Smart Matching",
    description:
      "EcoBridge finds the nearest recyclers using intelligent geo-matching.",
  },
  {
    icon: <FaHandshake />,
    title: "Recycler Reserves",
    description:
      "Nearby recyclers browse available waste and reserve pickups instantly.",
  },
  {
    icon: <FaTruck />,
    title: "Pickup Completed",
    description:
      "Waste is collected and both users can track completed pickups.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl font-bold text-center text-gray-800">
            How EcoBridge Works
          </h2>

          <p className="text-center text-gray-500 mt-3 mb-16">
            A simple four-step workflow connecting waste generators with recyclers.
          </p>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

            {steps.map((step, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="relative bg-green-50 rounded-3xl shadow-lg p-8 text-center"
              >

                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <div className="text-5xl text-green-600 mt-6 mb-6">

                  {step.icon}

                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">

                  {step.title}

                </h3>

                <p className="text-gray-600 leading-7">

                  {step.description}

                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}