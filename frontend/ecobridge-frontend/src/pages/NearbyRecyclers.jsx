import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";

import { getAllRecyclers } from "../services/recyclerService";
import { getGoogleRecyclers } from "../services/googleRecyclerService";
import { loadGoogleMaps } from "../utils/googleMaps";

import {
    FaRecycle,
    FaMapMarkerAlt,
    FaGoogle,
    FaExternalLinkAlt,
} from "react-icons/fa";

export default function NearbyRecyclers() {

    const { wasteId } = useParams();

    const [recyclers, setRecyclers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [userLocation, setUserLocation] = useState(null);

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        loadRecyclers();
    }, []);

   const loadRecyclers = async () => {
    setLoading(true);

    try {
        // --------------------------------------------------
        // 1. Get Generator Location
        // --------------------------------------------------

        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                }
            );
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
            latitude,
            longitude,
        });

        // --------------------------------------------------
        // 2. Get BOTH sources independently
        // --------------------------------------------------

        const [ecoBridgeResult, googleResult] =
            await Promise.allSettled([
                getAllRecyclers(),
                getGoogleRecyclers(latitude, longitude),
            ]);

        // --------------------------------------------------
        // 3. EcoBridge recyclers
        // --------------------------------------------------

        let ourRecyclers = [];

        if (ecoBridgeResult.status === "fulfilled") {
            ourRecyclers = (ecoBridgeResult.value.data || []).map(
                (recycler) => ({
                    ...recycler,
                    source: "ECOBRIDGE",
                })
            );
        } else {
            console.warn(
                "EcoBridge recycler service unavailable:",
                ecoBridgeResult.reason
            );
        }

        // --------------------------------------------------
        // 4. Google recyclers
        // --------------------------------------------------

        let googleRecyclers = [];

        if (googleResult.status === "fulfilled") {
            googleRecyclers = googleResult.value || [];
        } else {
            console.warn(
                "Google recycler search failed:",
                googleResult.reason
            );
        }

        // --------------------------------------------------
        // 5. Combine both
        // --------------------------------------------------

        setRecyclers([
            ...ourRecyclers,
            ...googleRecyclers,
        ]);

    } catch (error) {
        console.error(error);

        toast.error(
            "Unable to access your location"
        );
    } finally {
        setLoading(false);
    }
};

    // ==========================================================
    // GOOGLE MAP
    // ==========================================================

    useEffect(() => {

        if (
            loading ||
            !userLocation ||
            !mapRef.current
        ) {
            return;
        }

        const initializeMap = async () => {

            try {

                await loadGoogleMaps();

                const google = window.google;

                if (!google?.maps) {
                    throw new Error(
                        "Google Maps failed to load"
                    );
                }

                // --------------------------------------------------
                // Create Map
                // --------------------------------------------------

                const center = {
                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                };

                mapInstance.current =
                    new google.maps.Map(
                        mapRef.current,
                        {
                            center,
                            zoom: 12,
                            mapTypeControl: false,
                            streetViewControl: false,
                            fullscreenControl: true,
                            zoomControl: true,
                        }
                    );

                // --------------------------------------------------
                // Clear Old Markers
                // --------------------------------------------------

                markersRef.current.forEach((marker) => {
                    marker.setMap(null);
                });

                markersRef.current = [];

                // --------------------------------------------------
                // Generator Location Marker
                // --------------------------------------------------

                const userMarker =
                    new google.maps.Marker({
                        position: center,
                        map: mapInstance.current,
                        title: "Your Location",
                        icon: {
                            url:
                                "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        },
                    });

                markersRef.current.push(
                    userMarker
                );

                // --------------------------------------------------
                // Recycler Markers
                // --------------------------------------------------

                recyclers.forEach((recycler) => {

                    const lat =
                        recycler.latitude ??
                        recycler.location?.lat;

                    const lng =
                        recycler.longitude ??
                        recycler.location?.lng;

                    if (
                        typeof lat !== "number" ||
                        typeof lng !== "number"
                    ) {
                        return;
                    }

                    const marker =
                        new google.maps.Marker({

                            position: {
                                lat,
                                lng,
                            },

                            map: mapInstance.current,

                            title:
                                recycler.name ||
                                recycler.recyclerName ||
                                recycler.companyName ||
                                "Recycler",

                            icon: {
                                url:
                                    recycler.source ===
                                    "GOOGLE"
                                        ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                        : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                            },

                        });

                    // --------------------------------------------------
                    // Marker Info Window
                    // --------------------------------------------------

                    const name =
                        recycler.name ||
                        recycler.recyclerName ||
                        recycler.companyName ||
                        "Recycler";

                    const source =
                        recycler.source === "GOOGLE"
                            ? "Google Listed"
                            : "EcoBridge Recycler";

                    const infoWindow =
                        new google.maps.InfoWindow({
                            content: `
                                <div style="
                                    min-width:220px;
                                    padding:8px;
                                    font-family:Arial,sans-serif;
                                ">
                                    <h3 style="
                                        margin:0 0 6px;
                                        font-size:16px;
                                        font-weight:700;
                                    ">
                                        ${name}
                                    </h3>

                                    <p style="
                                        margin:0 0 8px;
                                        color:#666;
                                        font-size:13px;
                                    ">
                                        ${source}
                                    </p>

                                    <p style="
                                        margin:0;
                                        font-size:13px;
                                        color:#444;
                                    ">
                                        ${recycler.address || ""}
                                    </p>
                                </div>
                            `,
                        });

                    marker.addListener(
                        "click",
                        () => {

                            infoWindow.open({
                                map: mapInstance.current,
                                anchor: marker,
                            });

                        }
                    );

                    markersRef.current.push(marker);

                });

            } catch (error) {

                console.error(
                    "Google Map initialization failed:",
                    error
                );

            }

        };

        initializeMap();

        return () => {

            markersRef.current.forEach(
                (marker) => marker.setMap(null)
            );

            markersRef.current = [];

        };

    }, [
        loading,
        userLocation,
        recyclers,
    ]);

    // ==========================================================
    // LOADING
    // ==========================================================

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101411]">

                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />

            </div>
        );

    }

    // ==========================================================
    // PAGE
    // ==========================================================

    return (

        <div className="min-h-screen bg-[#101411] p-6 md:p-8">

            <PageHeader
                title="Nearby Recyclers"
                subtitle="Find EcoBridge recyclers and verified recycling businesses near you."
            />

            {/* ==================================================
                MAP
            ================================================== */}

            <AppCard className="mb-8 overflow-hidden">

                <div className="mb-4 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Recycler Map
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Green = EcoBridge &nbsp; • &nbsp;
                            Red = Google Listed &nbsp; • &nbsp;
                            Blue = Your Location
                        </p>

                    </div>

                    <div className="hidden items-center gap-4 text-sm md:flex">

                        <span className="flex items-center gap-2 text-gray-300">
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            EcoBridge
                        </span>

                        <span className="flex items-center gap-2 text-gray-300">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            Google
                        </span>

                    </div>

                </div>

                <div
                    ref={mapRef}
                    className="h-[420px] w-full rounded-2xl overflow-hidden"
                />

            </AppCard>

            {/* ==================================================
                RECYCLER LIST
            ================================================== */}

            {recyclers.length === 0 ? (

                <AppCard>

                    <div className="py-16 text-center">

                        <FaRecycle className="mx-auto mb-5 text-6xl text-[#A4B465]" />

                        <h2 className="text-2xl font-bold text-white">
                            No recyclers found
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Try again from another location.
                        </p>

                    </div>

                </AppCard>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {recyclers.map((recycler, index) => {

                        const lat =
                            recycler.latitude ??
                            recycler.location?.lat;

                        const lng =
                            recycler.longitude ??
                            recycler.location?.lng;

                        return (

                            <AppCard
                                key={`${recycler.source}-${recycler.id || index}`}
                            >

                                <div className="space-y-5">

                                    {/* Header */}

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A4B465]/10">

                                            <FaRecycle className="text-xl text-[#A4B465]" />

                                        </div>

                                        <div>

                                            <h2 className="text-xl font-bold text-white">

                                                {recycler.name ||
                                                    recycler.recyclerName ||
                                                    recycler.companyName}

                                            </h2>

                                            <p className="mt-1 text-sm text-gray-400">

                                                {recycler.address ||
                                                    "Address unavailable"}

                                            </p>

                                        </div>

                                    </div>

                                    {/* Source */}

                                    <div>

                                        {recycler.source === "GOOGLE" ? (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">

                                                <FaGoogle />

                                                Google Listed

                                            </span>

                                        ) : (

                                            <span className="inline-flex items-center gap-2 rounded-full bg-[#A4B465]/10 px-3 py-1.5 text-xs font-semibold text-[#A4B465]">

                                                <FaRecycle />

                                                EcoBridge Recycler

                                            </span>

                                        )}

                                    </div>

                                    {/* EcoBridge Information */}

                                    {recycler.source === "ECOBRIDGE" && (

                                        <div className="space-y-2 text-sm text-gray-300">

                                            {recycler.recyclerType && (

                                                <p>

                                                    <span className="text-gray-500">
                                                        Type:
                                                    </span>{" "}

                                                    {recycler.recyclerType}

                                                </p>

                                            )}

                                            {recycler.phone && (

                                                <p>

                                                    <span className="text-gray-500">
                                                        Phone:
                                                    </span>{" "}

                                                    {recycler.phone}

                                                </p>

                                            )}

                                            {recycler.serviceRadiusKm && (

                                                <p>

                                                    <span className="text-gray-500">
                                                        Service Radius:
                                                    </span>{" "}

                                                    {recycler.serviceRadiusKm} km

                                                </p>

                                            )}

                                        </div>

                                    )}

                                    {/* Actions */}

                                    <div className="flex flex-wrap gap-3">

                                        {/* Navigate */}

                                        {typeof lat === "number" &&
                                            typeof lng === "number" && (

                                                <AppButton
                                                    className="flex-1"
                                                    onClick={() =>
                                                        window.open(
                                                            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                                                            "_blank"
                                                        )
                                                    }
                                                >

                                                    <FaMapMarkerAlt className="mr-2 inline" />

                                                    Navigate

                                                </AppButton>

                                            )}

                                        {/* Website */}

                                        {recycler.source === "GOOGLE" &&
                                            recycler.website && (

                                                <a
                                                    href={recycler.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-1 items-center justify-center rounded-xl border border-[#A4B465]/30 px-4 py-3 font-semibold text-[#A4B465] transition hover:bg-[#A4B465]/10"
                                                >
                                                    Website ↗
                                                </a>

                                            )}

                                        {/* Google Maps */}

                                        {recycler.source === "GOOGLE" &&
                                            recycler.googleMapsUri && (

                                                <AppButton
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    onClick={() =>
                                                        window.open(
                                                            recycler.googleMapsUri,
                                                            "_blank"
                                                        )
                                                    }
                                                >

                                                    <FaExternalLinkAlt />

                                                </AppButton>

                                            )}

                                    </div>

                                </div>

                            </AppCard>

                        );

                    })}

                </div>

            )}

        </div>
    );
}