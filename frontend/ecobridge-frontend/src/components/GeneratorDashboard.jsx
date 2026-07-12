import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
export default function GeneratorDashboard() {

    const [wasteList, setWasteList] = useState([]);
    const totalWaste = wasteList.length;

const availableWaste =
    wasteList.filter(
        w => w.status === "AVAILABLE"
    ).length;

const reservedWaste =
    wasteList.filter(
        w => w.status === "RESERVED"
    ).length;

const completedWaste =
    wasteList.filter(
        w => w.status === "COMPLETED"
    ).length;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const loadWaste = async () => {

            try {

                const token = localStorage.getItem("accessToken");

                const response = await api.get(
                    "/api/v1/waste/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setWasteList(response.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        loadWaste();

    }, []);

    if (loading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (

    <div className="min-h-screen p-6 md:p-8 bg-slate-100">

        <PageHeader
            title={`🌱 Welcome back, ${localStorage.getItem("userName")}`}
            subtitle="Manage your recyclable waste, monitor requests and track recycling progress."
        />

        <div className="mb-8">
            <AppButton
                onClick={() => navigate("/generator/create")}
            >
                🌱 Create Waste
            </AppButton>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <StatCard
    title="Total Waste"
    value={totalWaste}
    icon="♻️"
    color="text-green-700"
    bg="bg-green-100"
/>

<StatCard
    title="Available"
    value={availableWaste}
    icon="🟢"
    color="text-green-700"
    bg="bg-green-100"
/>

<StatCard
    title="Reserved"
    value={reservedWaste}
    icon="🟠"
    color="text-orange-600"
    bg="bg-orange-100"
/>

<StatCard
    title="Completed"
    value={completedWaste}
    icon="🔵"
    color="text-blue-600"
    bg="bg-blue-100"
/>

        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-5">
            Recent Waste
        </h2>

        {wasteList.length === 0 ? (

            <AppCard>

                <div className="text-center py-10">

                    <h2 className="text-2xl font-semibold">
                        No Waste Published Yet 🌱
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Click "Create Waste" to publish your first recyclable waste.
                    </p>

                </div>

            </AppCard>

        ) : (

            <div className="space-y-6">

                {wasteList.map((waste) => (

                    <AppCard key={waste.id}>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            <div>

                                <h3 className="text-xl font-bold text-green-700">
                                    {waste.title}
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    {waste.description}
                                </p>

                                <p className="mt-3 text-gray-700">
                                    <strong>Type:</strong> {waste.wasteType}
                                </p>

                                <p className="text-gray-700">
                                    <strong>Quantity:</strong> {waste.quantity} {waste.quantityUnit}
                                </p>

                            </div>

                            <div>

                                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                                    {waste.status}
                                </span>

                            </div>

                        </div>

                    </AppCard>

                ))}

            </div>

        )}

    </div>

);
}