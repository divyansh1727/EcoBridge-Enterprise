import { motion } from "framer-motion";
import {
  FaRecycle,
  FaTruck,
  FaMapMarkedAlt,
  FaClipboardList,
  FaLeaf,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";

export default function GeneratorRecycler() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-gray-800">
            Built for Everyone
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            EcoBridge intelligently connects waste generators with nearby
            recyclers through a seamless workflow.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Generator */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-white shadow-xl p-10 border border-green-100"
          >

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <FaRecycle className="text-3xl text-green-600" />

              </div>

              <div>

                <h3 className="text-3xl font-bold text-gray-800">
                  Generator
                </h3>

                <p className="text-gray-500">
                  Publish recyclable waste
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <Feature
                icon={<FaClipboardList />}
                text="Create Waste Listings"
              />

              <Feature
                icon={<FaLeaf />}
                text="Upload Waste Images"
              />

              <Feature
                icon={<FaMapMarkedAlt />}
                text="Live Location Support"
              />

              <Feature
                icon={<FaTruck />}
                text="Track Pickup Requests"
              />

            </div>

          </motion.div>

          {/* Recycler */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-green-700 text-white shadow-xl p-10"
          >

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">

                <FaTruck className="text-3xl text-green-700" />

              </div>

              <div>

                <h3 className="text-3xl font-bold">
                  Recycler
                </h3>

                <p className="text-green-100">
                  Collect nearby recyclable waste
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <FeatureWhite
                icon={<FaMapMarkedAlt />}
                text="Nearby Waste Discovery"
              />

              <FeatureWhite
                icon={<FaArrowRight />}
                text="Reserve Pickups"
              />

              <FeatureWhite
                icon={<FaHistory />}
                text="Pickup History"
              />

              <FeatureWhite
                icon={<FaLeaf />}
                text="Eco Contribution"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="text-green-600 text-xl">
        {icon}
      </div>

      <span className="text-gray-700 text-lg">
        {text}
      </span>

    </div>
  );
}

function FeatureWhite({ icon, text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="text-white text-xl">
        {icon}
      </div>

      <span className="text-lg">
        {text}
      </span>

    </div>
  );
}