import { useEffect, useState } from "react";
import { getMyPickups } from "../services/wasteService";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import toast from "react-hot-toast";
import { completePickup } from "../services/wasteService";

export default function MyPickups() {

    const [pickups, setPickups] = useState([]);

    useEffect(() => {

        const loadPickups = async () => {

            try {

                const response =
                    await getMyPickups();

                setPickups(response.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadPickups();

    }, []);
    const handleComplete = async (id) => {

    try {

        await completePickup(id);

        toast.success(
            "Pickup Completed!"
        );

        setPickups(prev =>
            prev.filter(w => w.id !== id)
        );

    }

    catch (err) {

        console.error(err);

        toast.error(
            "Unable to complete pickup"
        );

    }

};

    return (

        <div>

            <PageHeader
                title="📦 My Pickups"
                subtitle="Waste reserved by you."
            />

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {pickups.map((waste) => (

                    <AppCard key={waste.id}>

                        {waste.imageUrl ? (

                            <img
                                src={waste.imageUrl}
                                alt={waste.title}
                                className="w-full h-52 object-cover rounded-xl mb-4"
                            />

                        ) : (

                            <div className="h-52 bg-gray-100 rounded-xl flex items-center justify-center text-6xl">

                                ♻️

                            </div>

                        )}

                        <h2 className="text-2xl font-bold text-green-700">

                            {waste.title}

                        </h2>

                        <p className="text-gray-600 mt-2">

                            {waste.description}

                        </p>

                        <div className="mt-5 space-y-2">

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

                        </div>

                        <button
    onClick={() =>
        handleComplete(waste.id)
    }
    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
>

    ✅ Complete Pickup

</button>

                    </AppCard>

                ))}

            </div>

        </div>

    );

}