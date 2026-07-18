import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";

import { getWasteById } from "../services/wasteService";
import { getNearbyRecyclers, getPublicRecyclers } from "../services/matchingService";

import {
    FaIndustry,
    FaMapMarkerAlt,
    FaTruck,
    FaCheckCircle,
    FaGlobe,
    FaWeightHanging,
} from "react-icons/fa";

export default function NearbyRecyclers() {
    const { wasteId } = useParams();
    const [verified, setVerified] = useState([]);
    const [publicRecyclers, setPublicRecyclers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const waste = await getWasteById(wasteId);
                const latitude = waste.data.latitude;
                const longitude = waste.data.longitude;

                const verifiedResponse = await getNearbyRecyclers(latitude, longitude);
                setVerified(verifiedResponse.data.verified || []);

                const publicResponse = await getPublicRecyclers(latitude, longitude);
                setPublicRecyclers(publicResponse.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [wasteId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101411]">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="Recycling Partners"
                subtitle="Verified EcoBridge recyclers and nearby public recycling centres."
            />

            {/* Section 1: Verified EcoBridge Partners */}
            <h2 className="mb-8 mt-8 flex items-center gap-3 text-3xl font-bold text-white">
                <FaCheckCircle className="text-[#A4B465]" />
                Verified EcoBridge Partners
            </h2>

            {verified.length === 0 ? (
                <p className="text-gray-400 mb-8">No verified matching partners found near this location.</p>
            ) : (
                <div className="grid lg: gap-6 mb-12">
                    {verified.map((recycler) => (
                        <AppCard key={recycler.recyclerId}>
                            <h2 className="text-2xl font-bold text-[#A4B465] flex items-center gap-2">
                                <FaIndustry className="text-xl" />
                                {recycler.companyName}
                            </h2>

                            <div className="mt-4 space-y-2 text-gray-300">
                                <p className="flex items-center gap-2">
                                    <span className="text-gray-500">Contact:</span> {recycler.recyclerName}
                                </p>
                                <p className="flex items-center gap-2 text-green-400 font-semibold">
                                    <FaTruck /> {recycler.distanceKm.toFixed(2)} km away
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaWeightHanging className="text-gray-400" />
                                    <span className="text-gray-400">Available Capacity:</span> {recycler.availableCapacity} kg
                                </p>
                            </div>

                            <div className="mt-6">
                                <AppButton
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    onClick={() =>
                                        window.open(
                                            `https://www.google.com/maps?q=${recycler.latitude},${recycler.longitude}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    <FaMapMarkerAlt className="mr-2 inline" />
                                    Open in Maps
                                </AppButton>
                            </div>
                        </AppCard>
                    ))}
                </div>
            )}

            {/* Section 2: Public Recycling Centres */}
            <h2 className="text-3xl font-bold mt-12 mb-8 text-white flex items-center gap-3">
                <FaGlobe className="text-blue-400" />
                Public Recycling Centres
            </h2>

            {publicRecyclers.length === 0 ? (
                <p className="text-gray-400">No public recycling centers detected nearby.</p>
            ) : (
                <div className="grid lg: gap-6">
                    {publicRecyclers.map((centre, index) => (
                        <AppCard key={index}>
                            <h2 className="text-xl font-bold text-white">
                                {centre.name}
                            </h2>

                            <p className="mt-3 text-gray-400 leading-relaxed">
                                <FaMapMarkerAlt className="inline mr-2 text-gray-500" />
                                {centre.address}
                            </p>

                            <div className="mt-6">
                                <AppButton
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={() =>
                                        window.open(
                                            `https://www.google.com/maps?q=${centre.latitude},${centre.longitude}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    <FaMapMarkerAlt className="mr-2 inline" />
                                    Open in Maps
                                </AppButton>
                            </div>
                        </AppCard>
                    ))}
                </div>
            )}
        </div>
    );
}