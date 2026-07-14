import StatCard from "./ui/StatCard";
import { useState } from "react";
import { useEffect } from "react";
import {
    getRecyclerDashboard
} from "../services/wasteService"
import {
    FaRecycle,
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";;

export default function RecyclerDashboard() {
  const [stats, setStats] = useState({

    availableWaste: 0,

    reservedWaste: 0,

    completedWaste: 0


});
useEffect(() => {

    const loadDashboard = async () => {

        try {

            const response =
                await getRecyclerDashboard();

            setStats(response.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    loadDashboard();

}, []);
return(

    <div className="min-h-screen bg-[#101411] p-8">

    <div className="mb-10">

        <span className="rounded-full border border-[#A4B465]/20 bg-[#A4B465]/10 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[#A4B465]">

            DASHBOARD

        </span>

        <h1 className="mt-6 text-5xl font-black text-white">

            Welcome Back

        </h1>

        <p className="mt-3 text-lg text-gray-400">

            Monitor available waste and manage pickup activity.

        </p>

    </div>

    <div className="grid gap-6 md:grid-cols-3">

        <StatCard
    title="Available Waste"
    value={stats.availableWaste}
    icon={<FaRecycle />}
    color="text-[#A4B465]"
    bg="bg-[#A4B465]/10"
/>

<StatCard
    title="Reserved"
    value={stats.reservedWaste}
    icon={<FaClock />}
    color="text-orange-400"
    bg="bg-orange-500/10"
/>

<StatCard
    title="Completed"
    value={stats.completedWaste}
    icon={<FaCheckCircle />}
    color="text-blue-400"
    bg="bg-blue-500/10"
/>

    </div>

</div>
);
}