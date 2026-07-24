import { useEffect, useState } from "react";
import { getMyWaste } from "../services/wasteService";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
import { FaPlus } from "react-icons/fa";
import {
  FaRecycle,
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
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

                const response = await getMyWaste();

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
                <div className="flex min-h-screen items-center justify-center bg-[#101411]">

<div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent"/>

</div>
            </div>
        );
    }

    return (

    <div className="min-h-screen bg-[#101411] p-8">

        <PageHeader
            title={` Welcome back, ${localStorage.getItem("userName")}`}
            subtitle="Manage your recyclable waste, track reservations and monitor
platform activity."
        />

        <div className="mb-8">
            <AppButton
    onClick={() => navigate("/generator/create")}
>
    <FaPlus className="mr-2" />

    Create Waste

</AppButton>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

    <StatCard
        title="Total Waste"
        value={totalWaste}
        icon={<FaRecycle />}
        color="text-[#A4B465]"
        bg="bg-[#A4B465]/10"
    />

    <StatCard
        title="Available"
        value={availableWaste}
        icon={<FaBoxOpen />}
        color="text-[#A4B465]"
        bg="bg-[#A4B465]/10"
    />

    <StatCard
        title="Reserved"
        value={reservedWaste}
        icon={<FaClock />}
        color="text-orange-400"
        bg="bg-orange-500/10"
    />

    <StatCard
        title="Completed"
        value={completedWaste}
        icon={<FaCheckCircle />}
        color="text-blue-400"
        bg="bg-blue-500/10"
    />

</div>

        <div className="mb-8">

<h2 className="text-3xl font-bold text-white">

Recent Waste Listings

</h2>

<p className="mt-2 text-gray-400">

Latest recyclable waste created by you.

</p>

</div>

        {wasteList.length === 0 ? (

            <AppCard>

<div className="py-12 text-center">

<h2 className="text-3xl font-bold text-white">

No Waste Listings

</h2>

<p className="mt-4 text-gray-400">

Create your first recyclable waste listing to start
connecting with nearby recyclers.

</p>

<div className="mt-8">

<AppButton
onClick={() => navigate("/generator/create")}
>

<FaPlus className="mr-2"/>

Create Waste

</AppButton>

</div>

</div>

</AppCard>

        ) : (

            <div className="space-y-6">

                {wasteList.map((waste) => (

                    <AppCard key={waste.id}>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            <div>

                                <h3 className="text-xl font-bold text-white">
                                    {waste.title}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    {waste.description}
                                </p>

                                <p className="mt-3 text-gray-300">
                                    <strong>Type:</strong> {waste.wasteType}
                                </p>

                                <p className="text-gray-300">
                                    <strong>Quantity:</strong> {waste.quantity} {waste.quantityUnit}
                                </p>

                            </div>

                            <div>

                                <span
className={`px-4 py-2 rounded-full font-semibold

${waste.status==="AVAILABLE"
?"bg-green-500/20 text-green-400"

:waste.status==="RESERVED"
?"bg-orange-500/20 text-orange-400"

:"bg-blue-500/20 text-blue-400"

}`}
>

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