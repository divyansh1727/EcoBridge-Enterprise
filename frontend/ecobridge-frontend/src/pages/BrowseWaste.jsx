import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";

import { getNearbyWaste } from "../services/matchingService";

import {
    FaRecycle,
    FaMapMarkerAlt,
    FaEye,
    FaWeightHanging,
    FaTag,
} from "react-icons/fa";

export default function BrowseWaste() {
    const [wasteList, setWasteList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const response = await getNearbyWaste(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setWasteList(response.data || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                console.error(err);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="Browse Waste"
                subtitle="Discover recyclable waste listings available near your current location."
            />

            {loading ? (
                <div className="py-14 text-center text-gray-400">Loading nearby waste...</div>
            ) : wasteList.length === 0 ? (
                <AppCard>
                    <div className="py-14 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4B465]/10">
                            <FaRecycle className="text-4xl text-[#A4B465]" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-white">
                            No Nearby Waste
                        </h2>
                        <p className="mt-3 text-gray-400">
                            We couldn't find any recyclable waste near your current location.
                        </p>
                    </div>
                </AppCard>
            ) : (
                <div className="mt-8 grid gap-6 md: lg:grid-cols-3">
                    {wasteList.map((waste) => (
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

                            <div className="mt-5 space-y-2 text-gray-300">
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <span className="rounded-full bg-[#A4B465]/10 px-4 py-2 text-sm font-semibold text-[#A4B465]">
                                        <FaTag className="inline mr-2" />
                                        {waste.wasteType}
                                    </span>
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300">
                                        <FaWeightHanging className="inline mr-2" />
                                        {waste.quantity} {waste.quantityUnit}
                                    </span>
                                </div>

                                <p className="mt-4">
                                    <strong className="text-white">Address:</strong> {waste.address}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Coordinates: {waste.latitude?.toFixed(4)}, {waste.longitude?.toFixed(4)}
                                </p>
                                {waste.distance != null && (
                                    <p className="text-green-600 font-semibold">
                                        📍 {waste.distance.toFixed(2)} km away
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 grid  gap-3">
                                <AppButton onClick={() => navigate(`/recycler/waste/${waste.id}`)}>
                                    <FaEye className="mr-2 inline" /> View
                                </AppButton>
                                <AppButton
                                    onClick={() =>
                                        window.open(
                                            `https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`,
                                            "_blank"
                                        )
                                    }
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <FaMapMarkerAlt className="mr-2 inline" /> Map
                                </AppButton>
                            </div>
                        </AppCard>
                    ))}
                </div>
            )}
        </div>
    );
}