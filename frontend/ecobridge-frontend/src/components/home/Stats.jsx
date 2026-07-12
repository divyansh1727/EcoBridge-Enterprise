import { motion } from "framer-motion";
import { CountUp } from "react-countup";
import {
  FaRecycle,
  FaUsers,
  FaMapMarkedAlt,
  FaLeaf,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaRecycle />,
    value: 500,
    suffix: "+",
    title: "Waste Listings",
    color: "text-green-500",
  },
  {
    icon: <FaUsers />,
    value: 150,
    suffix: "+",
    title: "Registered Users",
    color: "text-blue-500",
  },
  {
    icon: <FaMapMarkedAlt />,
    value: 30,
    suffix: "+",
    title: "Cities Connected",
    color: "text-orange-500",
  },
  {
    icon: <FaLeaf />,
    value: 12,
    suffix: " Tons",
    title: "Waste Recycled",
    color: "text-emerald-500",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl font-bold text-center text-gray-800">
            EcoBridge Impact
          </h2>

          <p className="text-center text-gray-500 mt-3 mb-14">
            Helping communities recycle smarter every day.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="bg-gray-50 rounded-3xl shadow-lg p-8 text-center border border-gray-100"
              >

                <div className={`text-5xl mb-5 ${item.color}`}>
                  {item.icon}
                </div>

                <h3 className="text-4xl font-extrabold text-gray-800">

                  {item.value}

                  {item.suffix}

                </h3>

                <p className="mt-3 text-gray-500">
                  {item.title}
                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}