import { useEffect, useState } from "react";
import { getPickupHistory } from "../services/wasteService";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";

import {
    FaRecycle,
    FaCheckCircle,
    FaCalendarAlt,
    FaWeightHanging,
    FaHistory,
} from "react-icons/fa";

export default function PickupHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await getPickupHistory();
                setHistory(response.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        loadHistory();
    }, []);

    // ================= STEP 4: EMPTY STATE ADDITION =================
    if (history.length === 0) {
        return (
            <div className="min-h-screen bg-[#101411] p-6 md:p-8">
                <PageHeader
                    title="Pickup History"
                    subtitle="View all successfully completed waste pickups."
                />
                <div className="mt-8">
                    <AppCard>
                        <div className="py-14 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4B465]/10">
                                <FaHistory className="text-4xl text-[#A4B465]" />
                            </div>
                            <h2 className="mt-6 text-3xl font-bold text-white">
                                No Pickup History
                            </h2>
                            <p className="mt-3 text-gray-400">
                                You haven't completed any waste pickups yet.
                            </p>
                        </div>
                    </AppCard>
                </div>
            </div>
        );
    }
    // ===============================================================

    // This main return only runs if history has 1 or more items
    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="Pickup History"
                subtitle="View all successfully completed waste pickups."
            />

            <div className="grid lg: xl:grid-cols-3 gap-6 mt-8">
                {history.map((waste) => (
                    <AppCard key={waste.id}>
                        {waste.imageUrl ? (
                            <img
                                src={waste.imageUrl}
                                alt={waste.title}
                                className="mb-5 h-56 w-full rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="mb-5 flex h-56 items-center justify-center rounded-2xl bg-[#A4B465]/10">
                                <FaRecycle className="text-6xl text-[#A4B465]" />
                            </div>
                        )}

                        <h2 className="text-2xl font-bold text-white">
                            {waste.title}
                        </h2>

                        <p className="mt-3 text-gray-400 leading-7">
                            {waste.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="rounded-full bg-[#A4B465]/10 px-4 py-2 text-sm font-semibold text-[#A4B465]">
                                <FaWeightHanging className="inline mr-2" />
                                {waste.quantity} {waste.quantityUnit}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300">
                                <FaCalendarAlt className="inline mr-2" />
                                {new Date(waste.updatedAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-500/10 py-3 font-semibold text-blue-400">
                            <FaCheckCircle />
                            Completed
                        </div>
                    </AppCard>
                ))}
            </div>
        </div>
    );
}