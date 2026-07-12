import { motion } from "framer-motion";
import {
  FaRecycle,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaCamera,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRecycle />,
    title: "Smart Waste Matching",
    description:
      "Automatically connects waste generators with the nearest suitable recyclers.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Geo Location",
    description:
      "Find nearby waste listings using real-time location and intelligent distance matching.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with protected routes and role-based access.",
  },
  {
    icon: <FaCamera />,
    title: "Image Upload",
    description:
      "Upload waste images for better identification and improved recycler confidence.",
  },
  {
    icon: <FaRobot />,
    title: "AI Ready",
    description:
      "Designed for AI-powered waste classification and smart recommendations.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics Dashboard",
    description:
      "Monitor waste listings, pickups, recycling activity and overall platform growth.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl font-bold text-center text-gray-800">
            Why Choose EcoBridge?
          </h2>

          <p className="text-center text-gray-500 mt-3 mb-14">
            Everything needed for a modern recycling ecosystem.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
              >

                <div className="text-5xl text-green-600 mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}
