import StatCard from "./ui/StatCard";
import { useState } from "react";
import { useEffect } from "react";
import {
    getRecyclerDashboard
} from "../services/wasteService";

export default function RecyclerDashboard() {
  const [stats, setStats] = useState({

    availableWaste: 0,

    reservedWaste: 0,

    completedWaste: 0


});
useEffect(() => {

    const loadDashboard = async () => {

        try {

            const response =
                await getRecyclerDashboard();

            setStats(response.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    loadDashboard();

}, []);

    return (

        <div>

            <h1 className="text-4xl font-bold text-green-700 mb-8">

                ♻️ Recycler Dashboard

            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <StatCard
                    title="Available Waste"
                    value={stats.availableWaste}
                />

                <StatCard
                    title="Reserved"
                    value={stats.reservedWaste}
                    color="text-orange-500"
                />

                <StatCard
                    title="Completed Pickups"
                    value={stats.completedWaste}
                    color="text-blue-500"
                />

            </div>

        </div>

    );

}