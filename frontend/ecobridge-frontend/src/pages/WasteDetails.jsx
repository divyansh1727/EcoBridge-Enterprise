import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";

import { reserveWaste } from "../services/wasteService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getWasteById } from "../services/wasteService";

export default function WasteDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [waste, setWaste] = useState(null);

    useEffect(() => {

        const loadWaste = async () => {

            try {

                const response =
                    await getWasteById(id);

                setWaste(response.data);

            }

            catch (err) {

                console.error(err);

            }

        };

        loadWaste();

    }, [id]);

    if (!waste)
        return <div>Loading...</div>;

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

        <div>

            <PageHeader
                title={waste.title}
                subtitle="Waste Details"
            />

            <AppCard>

                <img
                    src={waste.imageUrl}
                    alt={waste.title}
                    className="w-full h-96 object-cover rounded-xl"
                />

                <div className="mt-8 space-y-5">

                    <h2 className="text-4xl font-bold text-green-700">

                        {waste.title}

                    </h2>

                    <p className="text-gray-700 leading-8">

                        {waste.description}

                    </p>

                    <hr />

                    <div className="grid md:grid-cols-2 gap-6">

                        <p>

                            <strong>Waste Type:</strong>

                            {" "}
                            {waste.wasteType}

                        </p>

                        <p>

                            <strong>Quantity:</strong>

                            {" "}
                            {waste.quantity}

                            {" "}

                            {waste.quantityUnit}

                        </p>

                        <p>

                            <strong>Address:</strong>

                            {" "}

                            {waste.address}

                        </p>
                        <p>

    <strong>Location:</strong>

    <button
        onClick={() =>
            window.open(
                `https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`,
                "_blank"
            )
        }
        className="ml-3 text-green-600 font-semibold hover:underline"
    >
        📍 View on Map
    </button>

</p>
<button
    onClick={() =>
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${waste.latitude},${waste.longitude}`,
            "_blank"
        )
    }
    className="w-full border-2 border-green-600 text-green-700 py-3 rounded-xl hover:bg-green-50 transition"
>
    🧭 Navigate
</button>

                        <p>
    <strong>Status:</strong>{" "}

    <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
            waste.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : waste.status === "RESERVED"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
        }`}
    >
        {waste.status}
    </span>

</p>

                    </div>

                    <button
    disabled={waste.status !== "AVAILABLE"}
    onClick={handleReserve}
                        className={`w-full mt-8 py-4 rounded-xl text-lg font-bold transition ${
    waste.status === "AVAILABLE"
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
}`}
                    >

                        {
waste.status === "AVAILABLE"
    ? "Reserve Waste"
    : "Already Reserved"
}

                    </button>

                </div>

            </AppCard>

        </div>

    );

}