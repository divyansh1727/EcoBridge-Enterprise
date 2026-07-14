import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaRecycle,
  FaUsers,
  FaWarehouse,
  FaLeaf,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/analyticsService";

export default function Stats() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {

  try {

    const data = await getDashboardStats();
    setStats(data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}
if (loading) {
  return (
    <section className="min-h-[400px] bg-[#101411] flex items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
    </section>
  );
}

  const cards = [

    {
      title: "Waste Listings",
      value: stats?.waste ?? 0,
      suffix: "",
      icon: <FaRecycle />,
      color: "text-[#A4B465]",
    },

    {
      title: "Registered Users",
      value: stats?.users ?? 0,
      suffix: "",
      icon: <FaUsers />,
      color: "text-orange-400",
    },

    {
      title: "Recyclers",
      value: stats?.recyclers ?? 0,
      suffix: "",
      icon: <FaWarehouse />,
      color: "text-[#A4B465]",
    },

    {
      title: "Waste Recycled",

      value:
        stats?.recycledKg >= 1000
          ? (stats.recycledKg / 1000).toFixed(2)
          : stats?.recycledKg ?? 0,

      suffix:
        stats?.recycledKg >= 1000
          ? " Tons"
          : " KG",

      icon: <FaLeaf />,

      color: "text-orange-400",
    },

  ];

  return (

<section className="relative overflow-hidden bg-[#101411] py-28">

<div className="absolute inset-0">

<div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#7A9B33]/10 blur-[140px]" />

<div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[160px]" />

</div>

<div className="relative z-10 max-w-7xl mx-auto px-6">

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{duration:.7}}

className="text-center"

>

<span className="inline-block rounded-full border border-[#7A9B33]/30 bg-[#7A9B33]/10 px-5 py-2 text-sm font-medium text-[#C7D59F]">

LIVE PLATFORM IMPACT

</span>

<h2 className="mt-8 text-5xl font-black text-white">

Real-Time

<span className="text-[#A4B465]"> Platform </span>

Analytics

</h2>

<p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-400">

Every number below is fetched directly from EcoBridge services.
No mock data. No hardcoded values.

</p>

</motion.div>

<div className="mt-20 grid gap-8 grid-cols-2 xl:grid-cols-4">

{cards.map((card,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{

delay:index*.08,

duration:.55,

}}

whileHover={{

y:-10,

scale:1.03,

}}

className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:border-[#7A9B33]/40 hover:shadow-[0_0_45px_rgba(122,155,51,.18)] transition-all duration-300"

>

<div className={`text-5xl ${card.color}`}>

{card.icon}

</div>

<h3 className="mt-8 text-5xl font-black text-white">

<CountUp
    end={Number(card.value)}
    decimals={card.suffix === " Tons" ? 2 : 0}
    duration={2}
/>

{card.suffix}

</h3>

<p className="mt-4 text-gray-400">

{card.title}

</p>

</motion.div>

))}

</div>

<div className="mt-16 rounded-3xl border border-[#7A9B33]/20 bg-white/5 backdrop-blur-xl p-8">

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

<div>

<p className="text-gray-400">

Pickup Success Rate

</p>

<h2 className="mt-3 text-6xl font-black text-[#A4B465]">

<CountUp

end={stats?.pickupRate ?? 0}

decimals={1}

duration={2}

/>

%

</h2>

</div>

<div className="flex-1">

<div className="h-5 rounded-full bg-white/10 overflow-hidden">

<motion.div

initial={{width:0}}

whileInView={{

width: `${Math.min(stats?.pickupRate ?? 0, 100)}%`

}}

viewport={{once:true}}

transition={{

duration:1.4

}}

className="h-full rounded-full bg-gradient-to-r from-[#7A9B33] to-orange-400"

/>

</div>

<p className="mt-4 text-gray-400">

Successful waste pickups across the EcoBridge ecosystem.

</p>

</div>

</div>

</div>

</div>

</section>

);

}