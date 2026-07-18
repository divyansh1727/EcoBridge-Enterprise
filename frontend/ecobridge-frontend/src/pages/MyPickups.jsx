import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getMyPickups,
    completePickup,
} from "../services/wasteService";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";

import {
    FaRecycle,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaWeightHanging,
    FaBoxOpen,
} from "react-icons/fa";

export default function MyPickups() {
    const [pickups, setPickups] = useState([]);

    useEffect(() => {
        const loadPickups = async () => {
            try {
                const response = await getMyPickups();
                setPickups(response.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        loadPickups();
    }, []);

    const handleComplete = async (id) => {
        try {
            await completePickup(id);
            toast.success("Pickup Completed!");
            setPickups(prev => prev.filter(w => w.id !== id));
        } catch (err) {
            console.error(err);
            toast.error("Unable to complete pickup");
        }
    };

    // ================= EMPTY STATE HANDLING =================
    if (pickups.length === 0) {
        return (
            <div className="min-h-screen bg-[#101411] p-6 md:p-8">
                <PageHeader
                    title="My Pickups"
                    subtitle="Manage all recyclable waste currently reserved by you."
                />
                <div className="mt-8">
                    <AppCard>
                        <div className="py-14 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4B465]/10">
                                <FaBoxOpen className="text-4xl text-[#A4B465]" />
                            </div>
                            <h2 className="mt-6 text-3xl font-bold text-white">
                                No Active Pickups
                            </h2>
                            <p className="mt-3 text-gray-400">
                                Reserve recyclable waste to start managing pickups.
                            </p>
                        </div>
                    </AppCard>
                </div>
            </div>
        );
    }
    // ========================================================

    // This return handles rendering the actual list when items exist
    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="My Pickups"
                subtitle="Manage all recyclable waste currently reserved by you."
            />

            <div className="grid lg: xl:grid-cols-3 gap-6 mt-8">
                {pickups.map((waste) => (
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

                        <p className="text-gray-400 leading-7 mt-2 line-clamp-2">
                            {waste.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="rounded-full bg-[#A4B465]/10 px-4 py-2 text-sm font-semibold text-[#A4B465]">
                                <FaWeightHanging className="inline mr-2" />
                                {waste.quantity} {waste.quantityUnit}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300">
                                <FaMapMarkerAlt className="inline mr-2" />
                                {waste.address}
                            </span>
                        </div>

                        <div className="mt-6">
                            <AppButton
                                onClick={() => handleComplete(waste.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                <FaCheckCircle className="mr-2 inline" />
                                Complete Pickup
                            </AppButton>
                        </div>
                    </AppCard>
                ))}
            </div>
        </div>
    );
}