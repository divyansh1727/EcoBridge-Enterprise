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