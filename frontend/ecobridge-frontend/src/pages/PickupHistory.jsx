import { useEffect, useState } from "react";
import { getPickupHistory } from "../services/wasteService";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";

export default function PickupHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const response =
                    await getPickupHistory();

                setHistory(response.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadHistory();

    }, []);

    return (

        <div>

            <PageHeader
                title="📜 Pickup History"
                subtitle="Completed pickups."
            />

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {history.map((waste) => (

                    <AppCard key={waste.id}>

                        {waste.imageUrl ? (

                            <img
                                src={waste.imageUrl}
                                alt={waste.title}
                                className="w-full h-52 object-cover rounded-xl mb-4"
                            />

                        ) : (

                            <div className="h-52 bg-gray-100 rounded-xl flex justify-center items-center text-6xl">

                                ♻️

                            </div>

                        )}

                        <h2 className="text-2xl font-bold text-green-700">

                            {waste.title}

                        </h2>

                        <p className="mt-3">

                            {waste.description}

                        </p>

                        <p className="mt-4">

                            <strong>Quantity:</strong>

                            {" "}

                            {waste.quantity}

                            {" "}

                            {waste.quantityUnit}

                        </p>

                        <p>

                            <strong>Completed:</strong>

                            {" "}

                            {new Date(
                                waste.updatedAt
                            ).toLocaleDateString()}

                        </p>

                        <div className="mt-5 bg-blue-100 text-blue-700 rounded-xl py-3 text-center font-semibold">

                            COMPLETED

                        </div>

                    </AppCard>

                ))}

            </div>

        </div>

    );

}