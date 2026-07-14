import { motion } from "framer-motion";
import {
  FaRecycle,
  FaTruck,
  FaMapMarkedAlt,
  FaClipboardList,
  FaLeaf,
  FaHistory,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const generatorFeatures = [
  "Create Waste Listings",
  "Upload Waste Images",
  "Live Geo Location",
  "Track Pickup Requests",
];

const recyclerFeatures = [
  "Nearby Waste Discovery",
  "Reserve Pickups",
  "Pickup History",
  "Environmental Impact",
];

export default function GeneratorRecycler() {
  return (
    <section className="relative overflow-hidden bg-[#101411] py-28">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-[#7A9B33]/10 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[170px]" />

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

            CHOOSE YOUR ROLE

          </span>

          <h2 className="mt-8 text-5xl font-black text-white">

            Built for

            <span className="text-[#A4B465]"> Every </span>

            Participant

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">

            Whether you're generating recyclable waste or collecting it,
            EcoBridge provides a seamless workflow tailored to your role.

          </p>

        </motion.div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">

          <RoleCard
            icon={<FaRecycle />}
            title="Waste Generator"
            subtitle="Create and manage recyclable waste listings."
            features={generatorFeatures}
            button="Start as Generator"
            accent="olive"
            link="/register"
          />

          <RoleCard
            icon={<FaTruck />}
            title="Recycler Partner"
            subtitle="Discover nearby waste and manage pickups."
            features={recyclerFeatures}
            button="Become a Recycler"
            accent="orange"
            link="/register"
          />

        </div>

      </div>

    </section>
  );
}

function RoleCard({
  icon,
  title,
  subtitle,
  features,
  button,
  accent,
  link,
}) {

  const primary =
    accent === "orange"
      ? "text-orange-400"
      : "text-[#A4B465]";

  const bg =
    accent === "orange"
      ? "bg-orange-500/15"
      : "bg-[#7A9B33]/15";

  const hover =
    accent === "orange"
      ? "hover:border-orange-400/40 hover:shadow-[0_0_45px_rgba(249,115,22,.18)]"
      : "hover:border-[#7A9B33]/40 hover:shadow-[0_0_45px_rgba(122,155,51,.18)]";

  return (

    <motion.div

      initial={{ opacity:0, y:50 }}

      whileInView={{ opacity:1, y:0 }}

      viewport={{ once:true }}

      whileHover={{ y:-10 }}

      transition={{ duration:.55 }}

      className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 transition-all duration-300 ${hover}`}

    >

      <div className="flex items-center gap-5">

        <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${bg} text-4xl ${primary}`}>

          {icon}

        </div>

        <div>

          <h3 className="text-3xl font-bold text-white">

            {title}

          </h3>

          <p className="mt-2 text-gray-400">

            {subtitle}

          </p>

        </div>

      </div>

      <div className="mt-10 space-y-5">

        {features.map((item) => (

          <div
            key={item}
            className="flex items-center gap-4"
          >

            <FaCheckCircle className={primary} />

            <span className="text-gray-300">

              {item}

            </span>

          </div>

        ))}

      </div>

      <Link
        to={link}
        className={`mt-10 inline-flex items-center gap-3 rounded-xl px-7 py-4 font-semibold text-white transition-all duration-300 ${
          accent === "orange"
            ? "bg-orange-500 hover:bg-orange-400"
            : "bg-[#7A9B33] hover:bg-[#91B03A]"
        }`}
      >

        {button}

        <FaArrowRight />

      </Link>

    </motion.div>

  );
}