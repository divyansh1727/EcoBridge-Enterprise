import AppCard from "./ui/AppCard";
import AppButton from "./ui/AppButton";
import { useEffect, useState } from "react";

import RecyclerMap from "./maps/RecyclerMap";

import { getGoogleRecyclers } from "../services/googleRecyclerService";
import { getAllRecyclers } from "../services/recyclerService";
import { recommendRecyclers } from "../utils/recommendationEngine";

export default function CompareRecyclerModal({
    open,
    onClose,
    waste,
}) {
    const [verifiedRecyclers, setVerifiedRecyclers] = useState([]);
    const [googleRecyclers, setGoogleRecyclers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || !waste) return;

        const loadRecyclers = async () => {
            try {
                setLoading(true);

                const [
                    verifiedResponse,
                    googleResponse,
                ] = await Promise.all([
                    getAllRecyclers(),

                    getGoogleRecyclers(
                        waste.latitude,
                        waste.longitude
                    ),
                ]);

                // --------------------------------
                // EcoBridge Registered Recyclers
                // --------------------------------

                const ranked = recommendRecyclers(
                    verifiedResponse.data || [],
                    waste
                );

                setVerifiedRecyclers(ranked);

                // --------------------------------
                // Google Listed Businesses
                // --------------------------------

                setGoogleRecyclers(
                    googleResponse || []
                );

            } catch (err) {
                console.error(
                    "Failed to load recycler data:",
                    err
                );

                setVerifiedRecyclers([]);
                setGoogleRecyclers([]);

            } finally {
                setLoading(false);
            }
        };

        loadRecyclers();

    }, [open, waste]);

    if (!open || !waste) {
        return null;
    }

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

            <AppCard className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">

                {/* ================================
                    HEADER
                ================================= */}

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-3xl font-bold text-white">
                            ♻ Smart Recycler Comparison
                        </h2>

                        <p className="text-gray-400 mt-2">
                            {waste.title}
                        </p>

                        <p className="text-sm text-gray-400 mt-2">

                            {verifiedRecyclers.length} EcoBridge
                            {" "}registered recyclers •{" "}

                            {googleRecyclers.length} Google-listed
                            {" "}recycling businesses

                        </p>

                    </div>

                    <AppButton onClick={onClose}>
                        Close
                    </AppButton>

                </div>


                {/* ================================
                    BEST RECOMMENDATION
                ================================= */}

                <div className="space-y-3">

                    {verifiedRecyclers.length > 0 && (

                        <div className="mb-6 rounded-xl border border-[#A4B465] bg-[#A4B465]/10 p-5">

                            <h3 className="text-2xl font-bold text-[#A4B465]">
                                🏆 Best Recommendation
                            </h3>

                            <div className="mt-4 space-y-2 text-white">

                                <p>
                                    <strong>Company:</strong>{" "}
                                    {verifiedRecyclers[0].companyName}
                                </p>

                                <p>
                                    <strong>Distance:</strong>{" "}
                                    {verifiedRecyclers[0].distanceKm?.toFixed(2)} km
                                </p>

                                <p>
                                    <strong>Price Offered:</strong>{" "}
                                    ₹{verifiedRecyclers[0].offeredPrice?.toFixed(2)}/kg
                                </p>

                                <p>
                                    <strong>ETA:</strong>{" "}
                                    {verifiedRecyclers[0].etaMinutes} mins
                                </p>

                                <p>
                                    <strong>Rating:</strong>{" "}
                                    ⭐ {verifiedRecyclers[0].rating}
                                </p>

                                <p>
                                    <strong>Score:</strong>{" "}
                                    {verifiedRecyclers[0].score}
                                </p>

                            </div>

                        </div>

                    )}

                </div>


                {/* ================================
                    WASTE INFORMATION
                ================================= */}

                <div className="space-y-3">

                    <p className="text-gray-300">
                        Waste Type:{" "}
                        <strong>{waste.wasteType}</strong>
                    </p>

                    <p className="text-gray-300">
                        Quantity:{" "}
                        <strong>
                            {waste.quantity} {waste.quantityUnit}
                        </strong>
                    </p>

                    <p className="text-gray-300">
                        Coordinates:{" "}
                        {waste.latitude},{" "}
                        {waste.longitude}
                    </p>

                </div>


                {/* ================================
                    MAP
                ================================= */}

                <div className="mt-8">

                    <RecyclerMap
                        waste={waste}
                        verifiedRecyclers={verifiedRecyclers}
                        googleRecyclers={googleRecyclers}
                    />

                </div>


                {/* ================================
                    ECOBRIDGE RECYCLER TABLE
                ================================= */}

                <div className="mt-8">

                    <h3 className="mb-4 text-2xl font-bold text-white">
                        EcoBridge Recycler Comparison
                    </h3>

                    <div className="overflow-x-auto rounded-xl border border-white/10">

                        <table className="min-w-full">

                            <thead className="bg-[#1B221D]">

                                <tr>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Recycler
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Distance
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Price
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Capacity
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Rating
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        ETA
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Score
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {verifiedRecyclers.map((recycler) => (

                                    <tr
                                        key={recycler.recyclerId}
                                        className="border-t border-white/10"
                                    >

                                        <td className="px-4 py-4 text-white">

                                            <div className="font-semibold">
                                                {recycler.companyName}
                                            </div>

                                            {recycler.score ===
                                                verifiedRecyclers[0]?.score && (

                                                <span className="mt-1 inline-block rounded-full bg-[#A4B465]/20 px-2 py-1 text-xs text-[#A4B465]">
                                                    🏆 Best Match
                                                </span>

                                            )}

                                        </td>

                                        <td className="px-4 py-4 text-gray-300">
                                            {recycler.distanceKm?.toFixed(2)} km
                                        </td>

                                        <td className="px-4 py-4 text-green-400">
                                            ₹{recycler.offeredPrice?.toFixed(2)}/kg
                                        </td>

                                        <td className="px-4 py-4 text-gray-300">
                                            {recycler.availableCapacity} kg
                                        </td>

                                        <td className="px-4 py-4 text-yellow-400">
                                            ⭐ {recycler.rating}
                                        </td>

                                        <td className="px-4 py-4 text-gray-300">
                                            {recycler.etaMinutes} mins
                                        </td>

                                        <td className="px-4 py-4 font-bold text-[#A4B465]">
                                            {recycler.score}
                                        </td>

                                        <td className="px-4 py-4">

                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${recycler.latitude},${recycler.longitude}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <AppButton>
                                                    Navigate
                                                </AppButton>
                                            </a>

                                        </td>

                                    </tr>

                                ))}

                                {verifiedRecyclers.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="px-4 py-10 text-center text-gray-500"
                                        >
                                            No EcoBridge registered recyclers found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ================================
                    GOOGLE RECYCLING BUSINESSES
                ================================= */}

                <div className="mt-10">

                    <h3 className="mb-4 text-2xl font-bold text-white">
                        Nearby Public Recycling Businesses
                    </h3>

                    <p className="mb-4 text-sm text-gray-400">
                        Recycling businesses listed on Google Maps.
                        These businesses do not need to be registered
                        on EcoBridge.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-white/10">

                        <table className="min-w-full">

                            <thead className="bg-[#1B221D]">

                                <tr>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Address
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Website
                                    </th>

                                    <th className="px-4 py-3 text-left text-[#A4B465]">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {googleRecyclers.map((recycler) => (

                                    <tr
                                        key={recycler.id}
                                        className="border-t border-white/10"
                                    >

                                        <td className="px-4 py-4 text-white font-semibold">
                                            {recycler.name}
                                        </td>

                                        <td className="px-4 py-4 text-gray-300">
                                            {recycler.address ||
                                                "Address unavailable"}
                                        </td>

                                        <td className="px-4 py-4">

                                            {recycler.website ? (

                                                <a
                                                    href={recycler.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#A4B465] hover:underline"
                                                >
                                                    Website ↗
                                                </a>

                                            ) : (

                                                <span className="text-gray-500">
                                                    —
                                                </span>

                                            )}

                                        </td>

                                        <td className="px-4 py-4">

                                            <button
                                                onClick={() =>
                                                    window.open(
                                                        recycler.googleMapsUri ||
                                                        `https://www.google.com/maps/dir/?api=1&destination=${recycler.latitude},${recycler.longitude}`,
                                                        "_blank"
                                                    )
                                                }
                                                className="rounded-xl bg-[#A4B465] px-4 py-2 font-semibold text-[#101411] hover:opacity-90"
                                            >
                                                View on Google
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                                {googleRecyclers.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="px-4 py-10 text-center text-gray-500"
                                        >
                                            No Google-listed recycling
                                            businesses found nearby.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


            </AppCard>

        </div>
    );
}