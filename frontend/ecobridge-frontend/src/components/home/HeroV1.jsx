import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaRecycle,
  FaLeaf,
  FaMapMarkerAlt,
  FaGithub,
  FaShieldAlt,
  FaDatabase,
  FaDocker,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/analyticsService";
import { Link } from "react-router-dom";

function TechChip({ text }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
      {text}
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-green-100">
      <span className="text-green-300 text-xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
      <p className="text-green-200 text-sm">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}

function Activity({ color, title, status }) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className={`w-3 h-3 rounded-full ${color}`} />

        <span>{title}</span>

      </div>

      <span className="text-green-300 font-medium">
        {status}
      </span>

    </div>
  );
}


export default function HeroV2() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (err) {

            console.error(err);

        }

    };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#022c22] text-white min-h-[95vh]">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-green-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/10 blur-3xl" />

      </div>

      {/* Floating Icons */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute top-40 right-24 text-5xl"
      >
        ♻️
      </motion.div>

      <motion.div
        animate={{
          y: [0, 18, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute bottom-32 left-16 text-5xl"
      >
        🌱
      </motion.div>

      <div className="relative mx-auto flex min-h-[95vh] max-w-7xl flex-col items-center justify-between gap-20 px-6 pt-32 pb-20 lg:flex-row">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="max-w-2xl"
        >

          <div className="inline-flex items-center gap-3 rounded-full border border-green-300/20 bg-white/10 px-5 py-2 backdrop-blur-md">

            <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm font-semibold text-green-200">

              AI Powered • Geo Matching • Microservices

            </span>

          </div>

          <motion.img
            src={logo}
            alt="EcoBridge"
            className="mt-8 h-20 w-20"
            initial={{ scale: .7 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
            }}
          />

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

            Smart Waste

            <br />

            <span className="text-green-300">

              Management

            </span>

            <br />

            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">

              Platform

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-green-100">

            EcoBridge intelligently connects Waste
            Generators with nearby Recyclers using
            geo-location, secure authentication,
            cloud-ready microservices and scalable APIs.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
  to="/register"
              className="flex items-center gap-3 rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold shadow-xl transition hover:scale-105 hover:bg-green-400"
            >

              Get Started

              <FaArrowRight />

            </Link>

            <a
              href="https://github.com/divyansh1727/EcoBridge-Enterprise"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-green-300 px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-green-800"
            >

              <FaGithub />

              GitHub

            </a>

          </div>

          {/* Tech */}

          <div className="mt-10 flex flex-wrap gap-4">

            <TechChip text="Spring Boot" />
            <TechChip text="React" />
            <TechChip text="JWT" />
            <TechChip text="PostgreSQL" />
            <TechChip text="Docker" />
            <TechChip text="Microservices" />

          </div>

          <div className="grid grid-cols-3 gap-5 mt-10">

    <StatCard
        title="Users"
        value={stats?.users ?? 0}
    />

    <StatCard
        title="Generators"
        value={stats?.generators ?? 0}
    />

    <StatCard
        title="Recyclers"
        value={stats?.recyclers ?? 0}
    />

</div>

          {/* Highlights */}

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            <Feature
              icon={<FaShieldAlt />}
              text="JWT Secure"
            />

            <Feature
              icon={<FaMapMarkerAlt />}
              text="Geo Matching"
            />

            <Feature
              icon={<FaDatabase />}
              text="PostgreSQL"
            />

            <Feature
              icon={<FaDocker />}
              text="Cloud Ready"
            />

          </div>

          {/* Features */}

          <div className="mt-12 grid gap-5 sm:grid-cols-3">

            <Feature
              icon={<FaRecycle />}
              text="Smart Matching"
            />

            <Feature
              icon={<FaLeaf />}
              text="Eco Friendly"
            />

            <Feature
              icon={<FaMapMarkerAlt />}
              text="Live Tracking"
            />

          </div>

        </motion.div>

        {/* ===========================
            RIGHT SIDE CONTINUES
            IN PART 2
        =========================== */}

                <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center w-full lg:w-[520px]"
        >

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -top-8 -left-6 rounded-3xl bg-white p-5 shadow-2xl z-20"
          >

            <div className="text-4xl">
              ♻️
            </div>

            <h3 className="mt-3 text-2xl font-bold text-gray-800">
              {stats?.waste ?? 0}
            </h3>

            <p className="text-gray-500 text-sm">
              Waste Listings
            </p>

          </motion.div>

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute bottom-4 -right-6 rounded-3xl bg-green-600 p-5 shadow-2xl text-white z-20"
          >

            <div className="text-4xl">
              🌱
            </div>

            <h3 className="mt-3 text-xl font-bold">
              {
stats?.recycledKg >= 1000
    ? `${(stats.recycledKg/1000).toFixed(2)} Tons`
    : `${stats?.recycledKg ?? 0} KG`
}
            </h3>

            <p className="text-green-100">
              Recycled
            </p>

          </motion.div>

          {/* Dashboard */}

          <motion.div
            whileHover={{
              scale: 1.02,
              rotate: -1,
            }}
            transition={{
              duration: .3,
            }}
            className="relative w-full rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-[0_35px_90px_rgba(34,197,94,.25)]"
          >

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold">

                  LIVE

                </span>

                <p className="mt-3 text-green-200 text-sm">

                  Dashboard

                </p>

                <h2 className="text-3xl font-bold mt-1">

                  EcoBridge

                </h2>

              </div>

              <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-2xl">

                🌍

              </div>

            </div>

            <div className="my-8 h-px bg-white/20" />

            {/* Stats */}

            <div className="grid grid-cols-2 gap-5">

              <StatCard
title="Total Listings"
value={stats?.waste ?? 0}
/>

<StatCard
title="Available"
value={stats?.available ?? 0}
/>

<StatCard
title="Reserved"
value={stats?.reserved ?? 0}
/>

<StatCard
title="Completed"
value={stats?.completed ?? 0}
/>

            </div>

            {/* Recent */}

            <div className="mt-8 rounded-2xl bg-white/10 p-5">

              <h3 className="font-semibold text-lg">

                Recent Activity

              </h3>

              <div className="mt-5 space-y-4">

                <Activity
                  color="bg-green-500"
                  title="Plastic Bottles"
                  status="Matched"
                />

                <Activity
                  color="bg-blue-500"
                  title="Glass Waste"
                  status="Reserved"
                />

                <Activity
                  color="bg-orange-500"
                  title="Metal Scrap"
                  status="Completed"
                />

              </div>

            </div>

            {/* Bottom */}

            <div className="mt-8 rounded-2xl bg-green-500/20 border border-green-400/30 p-5">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-green-200">

                    Pickup Success

                  </p>

                  <h2 className="text-4xl font-black">

                    {stats?.pickupRate?.toFixed(1)}%

                  </h2>

                </div>

                <div className="text-6xl">

                  🚛

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* Scroll */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">

        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
          className="flex h-12 w-7 justify-center rounded-full border-2 border-green-300"
        >

          <div className="mt-2 h-2 w-2 rounded-full bg-green-300" />

        </motion.div>

      </div>

    </section>
  );
}
        
