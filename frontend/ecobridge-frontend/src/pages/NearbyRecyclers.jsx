import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWasteById } from "../services/wasteService";
import { getNearbyRecyclers,
    getPublicRecyclers
 } from "../services/matchingService";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";


export default function NearbyRecyclers() {

    const { wasteId } = useParams();

    const [verified, setVerified] = useState([]);

    const [publicRecyclers, setPublicRecyclers] = useState([]);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {

    try {

        const waste = await getWasteById(wasteId);

        const latitude = waste.data.latitude;
        const longitude = waste.data.longitude;

        const verifiedResponse =
            await getNearbyRecyclers(
                latitude,
                longitude
            );

        setVerified(verifiedResponse.data.verified);

        const publicResponse =
            await getPublicRecyclers(
                latitude,
                longitude
            );

        setPublicRecyclers(publicResponse.data);

    } catch (err) {

        console.error(err);

    }

};

    return (

        <div>

            <PageHeader
                title="🤝 Recycling Partners"
                subtitle="Verified EcoBridge recyclers near this waste."
            />

            <>
<h2 className="text-2xl font-bold mb-6">

    ♻ Verified EcoBridge Partners

</h2>

<div className="grid lg:grid-cols-2 gap-6">

    {verified.map((recycler) => (

        <AppCard key={recycler.recyclerId}>

            <h2 className="text-2xl font-bold text-green-700">

                {recycler.companyName}

            </h2>

            <p className="mt-2">

                👤 {recycler.recyclerName}

            </p>

            <p>

                🚚 {recycler.distanceKm.toFixed(2)} km away

            </p>

            <p>

                📦 Capacity : {recycler.availableCapacity} kg

            </p>

            <button
                className="mt-5 w-full bg-green-600 text-white rounded-xl py-3"
                onClick={() =>
                    window.open(
                        `https://www.google.com/maps?q=${recycler.latitude},${recycler.longitude}`,
                        "_blank"
                    )
                }
            >

                📍 Open in Maps

            </button>

        </AppCard>

    ))}

</div>

<h2 className="text-2xl font-bold mt-12 mb-6">

    🌍 Public Recycling Centres

</h2>

<div className="grid lg:grid-cols-2 gap-6">

    {publicRecyclers.map((centre, index) => (

        <AppCard key={index}>

            <h2 className="text-xl font-bold">

                {centre.name}

            </h2>

            <p className="mt-2">

                {centre.address}

            </p>

            <button
                className="mt-5 w-full bg-blue-600 text-white rounded-xl py-3"
                onClick={() =>
                    window.open(
                        `https://www.google.com/maps?q=${centre.latitude},${centre.longitude}`,
                        "_blank"
                    )
                }
            >

                📍 Open in Maps

            </button>

        </AppCard>

    ))}

</div>
</>

        </div>

    );

}