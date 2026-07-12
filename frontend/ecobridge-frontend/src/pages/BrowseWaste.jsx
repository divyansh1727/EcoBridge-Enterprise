import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import { useNavigate } from "react-router-dom";
import { getNearbyRecyclers } from "../services/matchingService";
import {getNearbyWaste} from "../services/matchingService";



export default function BrowseWaste() {

    const [wasteList, setWasteList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            try {

                const response = await getNearbyWaste(
                    position.coords.latitude,
                    position.coords.longitude
                );

                setWasteList(response.data);

            } catch (err) {

                console.error(err);

            }

        },

        (err) => {

            console.error(err);

        }

    );

}, []);

    return (

        <div>

            <PageHeader
                title="♻ Browse Waste"
                subtitle="Find recyclable waste around you."
            />

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {wasteList.map((waste) => (

                    <AppCard key={waste.id}>

                        {waste.imageUrl ? (

                            <img
                                src={waste.imageUrl}
                                alt={waste.title}
                                className="w-full h-52 object-cover rounded-xl mb-4"
                            />

                        ) : (

                            <div className="h-52 rounded-xl bg-gray-100 flex items-center justify-center text-6xl">

                                ♻️

                            </div>

                        )}

                        <h2 className="text-2xl font-bold text-green-700">

                            {waste.title}

                        </h2>

                        <p className="text-gray-600 mt-2 line-clamp-2">

                            {waste.description}

                        </p>

                        <div className="mt-5 space-y-2">

                            <p>

                                <strong>Type:</strong> {waste.wasteType}

                            </p>

                            <p>

                                <strong>Quantity:</strong> {waste.quantity} {waste.quantityUnit}

                            </p>

                            <p>

                                <strong>Address:</strong> {waste.address}

                            </p>
                            <p className="text-gray-500 text-sm">
    Coordinates:
    {waste.latitude.toFixed(4)},
    {waste.longitude.toFixed(4)}
</p>
                            {waste.distance != null && (
    <p className="text-green-600 font-semibold">
        📍 {waste.distance.toFixed(2)} km away
    </p>
)}

                        </div>

                        <div className="mt-6 space-y-3">

    <button
        onClick={() =>
            navigate(`/recycler/waste/${waste.id}`)
        }
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
    >
        View Details
    </button>

    <button
        onClick={() =>
            window.open(
                `https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`,
                "_blank"
            )
        }
        className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 py-3 rounded-xl transition"
    >
        📍 View on Map
    </button>

</div>
                    </AppCard>

                ))}

            </div>

        </div>

    );

}