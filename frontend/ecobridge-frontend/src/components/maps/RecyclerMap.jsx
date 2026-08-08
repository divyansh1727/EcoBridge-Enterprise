import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";

import { useState } from "react";

const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "16px",
};

export default function RecyclerMap({
    waste,
    verifiedRecyclers,
    googleRecyclers,
}) {
    const [selected, setSelected] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) {
        return (
            <div className="flex h-[500px] items-center justify-center rounded-xl bg-[#151A16]">
                <div className="text-gray-300">
                    Loading Google Maps...
                </div>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: Number(waste.latitude),
                lng: Number(waste.longitude),
            }}
            zoom={12}
        >

            {/* =====================================
                WASTE LOCATION
            ====================================== */}

            <Marker
                position={{
                    lat: Number(waste.latitude),
                    lng: Number(waste.longitude),
                }}
                icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                title="Waste Location"
            />


            {/* =====================================
                ECOBRIDGE REGISTERED RECYCLERS
            ====================================== */}

            {verifiedRecyclers?.map((recycler) => {

                const latitude = Number(recycler.latitude);
                const longitude = Number(recycler.longitude);

                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {
                    return null;
                }

                return (
                    <Marker
                        key={`ecobridge-${recycler.recyclerId}`}
                        position={{
                            lat: latitude,
                            lng: longitude,
                        }}
                        icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        title={
                            recycler.companyName ||
                            "EcoBridge Recycler"
                        }
                        onClick={() =>
                            setSelected({
                                ...recycler,
                                latitude,
                                longitude,
                                source: "ECOBRIDGE",
                            })
                        }
                    />
                );
            })}


            {/* =====================================
                GOOGLE-LISTED RECYCLING BUSINESSES
            ====================================== */}

            {googleRecyclers?.map((recycler, index) => {

                const latitude = Number(
                    recycler.latitude ??
                    recycler.location?.lat
                );

                const longitude = Number(
                    recycler.longitude ??
                    recycler.location?.lng
                );

                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {
                    return null;
                }

                return (
                    <Marker
                        key={`google-${recycler.id || index}`}
                        position={{
                            lat: latitude,
                            lng: longitude,
                        }}
                        icon="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                        title={
                            recycler.name ||
                            "Google Recycling Business"
                        }
                        onClick={() =>
                            setSelected({
                                ...recycler,
                                latitude,
                                longitude,
                                source: "GOOGLE",
                            })
                        }
                    />
                );
            })}


            {/* =====================================
                INFO WINDOW
            ====================================== */}

            {selected && (
                <InfoWindow
                    position={{
                        lat: Number(selected.latitude),
                        lng: Number(selected.longitude),
                    }}
                    onCloseClick={() =>
                        setSelected(null)
                    }
                >

                    <div className="min-w-[240px] text-black">

                        {/* Name */}

                        <h3 className="text-lg font-bold">
                            {selected.companyName ||
                                selected.name ||
                                "Recycler"}
                        </h3>


                        {/* =================================
                            ECOBRIDGE RECYCLER DETAILS
                        ================================== */}

                        {selected.source === "ECOBRIDGE" && (
                            <>

                                {selected.distanceKm !== undefined && (
                                    <p className="mt-2">
                                        Distance:{" "}
                                        {selected.distanceKm?.toFixed(2)} km
                                    </p>
                                )}

                                {selected.offeredPrice !== undefined && (
                                    <p>
                                        Price: ₹
                                        {selected.offeredPrice?.toFixed(2)}
                                        /kg
                                    </p>
                                )}

                                {selected.rating !== undefined && (
                                    <p>
                                        Rating: ⭐{" "}
                                        {selected.rating}
                                    </p>
                                )}

                                {selected.etaMinutes !== undefined && (
                                    <p>
                                        ETA:{" "}
                                        {selected.etaMinutes} mins
                                    </p>
                                )}

                            </>
                        )}


                        {/* =================================
                            GOOGLE BUSINESS DETAILS
                        ================================== */}

                        {selected.source === "GOOGLE" && (
                            <>

                                {selected.address && (
                                    <p className="mt-2">
                                        {selected.address}
                                    </p>
                                )}

                                {selected.website && (
                                    <a
                                        href={selected.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-block rounded bg-blue-600 px-3 py-2 text-white"
                                    >
                                        Website
                                    </a>
                                )}

                            </>
                        )}


                        {/* =================================
                            NAVIGATE
                        ================================== */}

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block rounded bg-green-600 px-3 py-2 text-white"
                        >
                            Navigate
                        </a>

                    </div>

                </InfoWindow>
            )}

        </GoogleMap>
    );
}