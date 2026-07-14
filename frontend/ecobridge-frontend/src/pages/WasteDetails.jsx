import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";

import {
    reserveWaste,
    getWasteById,
} from "../services/wasteService";

import {
    FaRecycle,
    FaMapMarkerAlt,
    FaWeightHanging,
    FaTag,
    FaCompass,
    FaCheckCircle,
} from "react-icons/fa";

export default function WasteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [waste, setWaste] = useState(null);

    useEffect(() => {
        const loadWaste = async () => {
            try {
                const response = await getWasteById(id);
                setWaste(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadWaste();
    }, [id]);

    if (!waste) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101411]">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
            </div>
        );
    }

    const handleReserve = async () => {
        try {
            await reserveWaste(waste.id);
            toast.success("🎉 Waste Reserved!");
            navigate("/recycler/my-pickups");
        } catch (err) {
            console.error(err);
            toast.error("Unable to reserve waste");
        }
    };

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title={waste.title}
                subtitle="Waste Details"
            />

            <AppCard>
                {waste.imageUrl ? (
                    <img
                        src={waste.imageUrl}
                        alt={waste.title}
                        className="h-[420px] w-full rounded-3xl object-cover"
                    />
                ) : (
                    <div className="flex h-[420px] w-full items-center justify-center rounded-3xl bg-[#A4B465]/10">
                        <FaRecycle className="text-8xl text-[#A4B465]" />
                    </div>
                )}

                <div className="mt-8 space-y-5">
                    <h2 className="text-4xl font-bold text-white">
                        {waste.title}
                    </h2>

                    <p className="text-gray-400 leading-8">
                        {waste.description}
                    </p>

                    <div className="border-t border-white/10" />

                    <div className="grid md:grid-cols-2 gap-6 text-white">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full bg-[#A4B465]/10 px-4 py-2 text-[#A4B465] font-semibold text-sm">
                                    <FaTag className="inline mr-2" />
                                    {waste.wasteType}
                                </span>

                                <span className="rounded-full bg-white/10 px-4 py-2 text-gray-300 text-sm">
                                    <FaWeightHanging className="inline mr-2" />
                                    {waste.quantity} {waste.quantityUnit}
                                </span>
                            </div>

                            <div>
                                <strong className="text-gray-400 block mb-1">Pickup Address</strong>
                                <p className="text-gray-200">{waste.address}</p>
                            </div>

                            <div>
                                <strong className="text-gray-400 block mb-2">Status</strong>
                                <span
                                    className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
                                        waste.status === "AVAILABLE"
                                            ? "bg-[#A4B465]/10 text-[#A4B465]"
                                            : waste.status === "RESERVED"
                                            ? "bg-orange-500/10 text-orange-400"
                                            : "bg-blue-500/10 text-blue-400"
                                    }`}
                                >
                                    {waste.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <strong className="text-gray-400 block mb-3">Location & Actions</strong>
                            <div className="grid grid-cols-2 gap-3">
                                <AppButton
                                    onClick={() =>
                                        window.open(
                                            `https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    <FaMapMarkerAlt className="mr-2 inline" />
                                    View Map
                                </AppButton>

                                <AppButton
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() =>
                                        window.open(
                                            `https://www.google.com/maps/dir/?api=1&destination=${waste.latitude},${waste.longitude}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    <FaCompass className="mr-2 inline" />
                                    Navigate
                                </AppButton>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <AppButton
                            disabled={waste.status !== "AVAILABLE"}
                            onClick={handleReserve}
                            className={`w-full py-4 text-lg ${
                                waste.status === "AVAILABLE"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-700 hover:bg-gray-700 cursor-not-allowed text-gray-400"
                            }`}
                        >
                            <FaCheckCircle className="mr-2 inline" />
                            {waste.status === "AVAILABLE" ? "Reserve Waste" : "Already Reserved"}
                        </AppButton>
                    </div>
                </div>
            </AppCard>
        </div>
    );
}