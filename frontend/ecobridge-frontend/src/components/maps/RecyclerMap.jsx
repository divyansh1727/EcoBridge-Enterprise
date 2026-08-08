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
    publicRecyclers,
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

                lat: waste.latitude,
                lng: waste.longitude,

            }}

            zoom={12}

        >

            {/* Waste Location */}

            <Marker

                position={{

                    lat: waste.latitude,
                    lng: waste.longitude,

                }}

                icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"

                title="Waste Location"

            />

            {/* EcoBridge Verified Recyclers */}

            {verifiedRecyclers.map((recycler) => (

                <Marker

                    key={recycler.recyclerId}

                    position={{

                        lat: recycler.latitude,
                        lng: recycler.longitude,

                    }}

                    icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"

                    onClick={() => setSelected(recycler)}

                />

            ))}

            {/* Public Recycling Centers */}

            {publicRecyclers.map((recycler, index) => (

                <Marker

                    key={index}

                    position={{

                        lat: recycler.latitude,
                        lng: recycler.longitude,

                    }}

                    icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"

                    onClick={() => setSelected(recycler)}

                />

            ))}

            {/* Google Listed Recycling Businesses */}

{googleRecyclers?.map((recycler, index) => {
    const latitude = Number(
        recycler.latitude ?? recycler.location?.lat
    );

    const longitude = Number(
        recycler.longitude ?? recycler.location?.lng
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
            title={recycler.name || "Google Recycling Business"}
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

            {selected && (

                <InfoWindow

                    position={{

                        lat: selected.latitude,
                        lng: selected.longitude,

                    }}

                    onCloseClick={() => setSelected(null)}

                >

                    <div className="min-w-[220px]">

                        <h3 className="font-bold text-lg">

                            {selected.companyName || selected.name}

                        </h3>

                        {"companyName" in selected && (

                            <>

                                <p>

                                    Distance: {selected.distanceKm?.toFixed(2)} km

                                </p>

                                <p>

                                    Price: ₹{selected.offeredPrice?.toFixed(2)}/kg

                                </p>

                                <p>

                                    Rating: ⭐ {selected.rating}

                                </p>

                                <p>

                                    ETA: {selected.etaMinutes} mins

                                </p>

                            </>

                        )}
                        {selected?.source === "GOOGLE" && (
    <>
        {selected.rating !== undefined && (
            <p>
                Rating: ⭐ {selected.rating}
            </p>
        )}

        {selected.address && (
            <p className="mt-1">
                {selected.address}
            </p>
        )}

        {selected.website && (
            <a
                href={selected.website}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded bg-blue-600 px-3 py-2 text-white"
            >
                Website
            </a>
        )}
    </>
)}

                        {"address" in selected && selected.address && (

                            <p>

                                {selected.address}

                            </p>

                        )}

                        <a

                            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`}

                            target="_blank"

                            rel="noreferrer"

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