import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaGithub,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/analyticsService";

function PrimaryButton() {
  return (
    <Link
      to="/register"
      className="
      inline-flex
      items-center
      gap-3
      rounded-xl
      bg-[#A4B465]
      px-8
      py-4
      font-semibold
      text-white
      shadow-xl
      transition-all
      duration-300
      hover:bg-[#93a254]
      hover:scale-105
      "
    >
      Get Started
      <FaArrowRight />
    </Link>
  );
}

function SecondaryButton() {
  return (
    <a
      href="https://github.com/divyansh1727/EcoBridge-Enterprise"
      target="_blank"
      rel="noreferrer"
      className="
      inline-flex
      items-center
      gap-3
      rounded-xl
      border
      border-[#A4B465]
      px-8
      py-4
      font-semibold
      text-white
      transition-all
      duration-300
      hover:bg-[#A4B465]/10
      "
    >
      <FaGithub />

      GitHub
    </a>
  );
}
function MiniStat({ title, value }) {
  return (
    <div
      className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      p-5
      backdrop-blur-xl
      "
    >
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}

function TrustBadge() {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-3
      rounded-full
      border
      border-[#A4B465]/30
      bg-[#A4B465]/10
      px-5
      py-2
      text-sm
      text-[#C7D59F]
      "
    >
      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />

      AI Powered • Geo Matching • Secure Platform
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-[#A4B465]/15
        text-[#A4B465]
        "
      >
        {icon}
      </div>

      <span className="text-gray-300">
        {text}
      </span>

    </div>
  );
}

export default function Hero() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    loadStats();

  }, []);

  async function loadStats() {

    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    }

  }
  return (

<section
    id="home"
    className="
    relative
    overflow-hidden
    bg-[#101411]
    min-h-screen
    flex
    items-center
    "
>

    {/* Background Gradient */}

    <div className="absolute inset-0">

        <div
            className="
            absolute
            -top-40
            -left-40
            w-[550px]
            h-[550px]
            rounded-full
            bg-[#A4B465]/15
            blur-[130px]
            "
        />

        <div
            className="
            absolute
            bottom-[-180px]
            right-[-180px]
            w-[600px]
            h-[600px]
            rounded-full
            bg-orange-500/10
            blur-[150px]
            "
        />

    </div>

    {/* Grid */}

    <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
        [background-size:60px_60px]
        "
    />

    {/* Container */}

    <div
        className="
        relative
        z-10
        mx-auto
        max-w-7xl
        px-6
        lg:px-8
        py-24
        grid
        lg:grid-cols-2
        gap-20
        items-center
        "
    >

        {/* LEFT */}

        <motion.div

            initial={{ opacity:0, x:-50 }}

            animate={{ opacity:1, x:0 }}

            transition={{ duration:0.8 }}

        >

            <div className="space-y-8">

    <TrustBadge />

    <div className="space-y-6">

        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="
                text-5xl
                md:text-6xl
                xl:text-7xl
                font-black
                leading-tight
                tracking-tight
                text-white
            "
        >
            Connecting
            <br />

            <span className="text-[#A4B465]">
                Waste
            </span>

            {" "}to{" "}

            <span className="text-orange-400">
                Worth.
            </span>
        </motion.h1>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="
                max-w-xl
                text-lg
                leading-8
                text-gray-300
            "
        >
            EcoBridge intelligently connects waste generators,
            recyclers, and communities through secure geo-matching,
            real-time tracking, and data-driven sustainability.
        </motion.p>

    </div>

    <motion.div

        initial={{ opacity:0 }}

        animate={{ opacity:1 }}

        transition={{ delay:0.45 }}

        className="flex flex-wrap gap-5"

    >

        <PrimaryButton />

        <SecondaryButton />

    </motion.div>

    <motion.div

        initial={{ opacity:0,y:20 }}

        animate={{ opacity:1,y:0 }}

        transition={{ delay:0.6 }}

        className="
            grid
            md:grid-cols-3
            gap-6
            pt-4
        "

    >

        <Feature

            icon={<FaLeaf />}

            text="Promoting Sustainable Recycling"

        />

        <Feature

            icon={<FaMapMarkerAlt />}

            text="Smart Geo Matching"

        />

        <Feature

            icon={<FaShieldAlt />}

            text="Enterprise Security"

        />

    </motion.div>

    <motion.div

        initial={{ opacity:0 }}

        animate={{ opacity:1 }}

        transition={{ delay:0.75 }}

        className="
            mt-6
            flex
            items-center
            gap-6
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-6
        "

    >

        <div className="grid grid-cols-3 gap-4 w-full">

    <MiniStat
        title="Users"
        value={stats?.users ?? 0}
    />

    <MiniStat
        title="Waste"
        value={stats?.waste ?? 0}
    />

    <MiniStat
        title="Recyclers"
        value={stats?.recyclers ?? 0}
    />

</div>

    </motion.div>

</div>

        </motion.div>


        {/* RIGHT */}

        <motion.div

            initial={{ opacity:0, x:50 }}

            animate={{ opacity:1, x:0 }}

            transition={{ duration:0.9 }}

            className="relative"

        >

            <div className="relative">

    {/* Main Dashboard */}

    <motion.div
        initial={{ opacity:0, scale:0.95 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.8 }}
        className="
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            overflow-hidden
        "
    >

        {/* Header */}

        <div className="border-b border-white/10 px-8 py-6 flex items-center justify-between">

            <div>

                <p className="text-sm text-gray-400">
                    EcoBridge Analytics
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                    Live Dashboard
                </h3>

            </div>

            <span
                className="
                    px-4
                    py-2
                    rounded-full
                    bg-[#A4B465]/20
                    text-[#A4B465]
                    text-sm
                    font-medium
                "
            >
                ● Live
            </span>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-5 p-8">

            <MiniStat
    title="Waste Listings"
    value={stats?.waste ?? 0}
/>

<MiniStat
    title="Available"
    value={stats?.available ?? 0}
/>

<MiniStat
    title="Reserved"
    value={stats?.reserved ?? 0}
/>

<MiniStat
    title="Completed"
    value={stats?.completed ?? 0}
/>

        </div>

        {/* Activity */}

        <div className="px-8 pb-8">

            <div
                className="
                    rounded-xl
                    bg-[#181D18]
                    p-6
                    border
                    border-white/5
                "
            >

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-gray-400">

                            Today's Activity

                        </p>

                        <h4 className="text-white text-xl font-semibold mt-1">

                            Recycling Growth

                        </h4>

                    </div>

                    <span className="text-orange-400 font-bold">

                        +18%

                    </span>

                </div>

                <div className="flex items-end gap-3 h-40 mt-8">

                    {[45,80,60,95,75,120,140].map((h,i)=>(

                        <motion.div

                            key={i}

                            initial={{height:0}}

                            animate={{height:h}}

                            transition={{
                                delay:0.2+i*0.08,
                                duration:0.6
                            }}

                            className="
                                flex-1
                                rounded-t-xl
                                bg-gradient-to-t
                                from-[#A4B465]
                                to-orange-400
                            "

                        />

                    ))}

                </div>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-6">

                <div className="rounded-2xl border border-white/10 bg-[#1B211C] p-5">

                    <p className="text-gray-400 text-sm">
                        Pickup Success
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-[#A4B465]">
                        {stats?.pickupRate?.toFixed(1) ?? "0"}%
                    </h3>

                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1B211C] p-5">

                    <p className="text-gray-400 text-sm">
                        Waste Recycled
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-orange-400">

                        {stats?.recycledKg >= 1000
                            ? `${(stats.recycledKg / 1000).toFixed(2)} Tons`
                            : `${stats?.recycledKg ?? 0} KG`}

                    </h3>

                </div>

            </div>

        </div>

    </motion.div>
    </div>

    
  </motion.div>
  

    </div>

</section>

);
}