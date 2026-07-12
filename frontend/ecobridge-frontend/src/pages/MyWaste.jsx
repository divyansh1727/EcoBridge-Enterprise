import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import {
    getMyWaste,
    deleteWaste
} from "../services/wasteService";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/ui/DeleteModal";
import toast from "react-hot-toast";



export default function MyWaste() {
    const navigate = useNavigate();

    const [wasteList, setWasteList] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [deleteWasteItem, setDeleteWasteItem] = useState(null);

    useEffect(() => {

    const loadWaste = async () => {

        try {

            const response = await getMyWaste();

            setWasteList(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    loadWaste();

}, []);
   const handleDeleteClick = (waste) => {

    setDeleteWasteItem(waste);

};
const confirmDelete = async () => {

    try {

        await deleteWaste(deleteWasteItem.id);

        setWasteList(prev =>
            prev.filter(
                w => w.id !== deleteWasteItem.id
            )
        );

        toast.success("🗑 Waste deleted successfully!");

    } catch (err) {

        console.error(err);

        toast.error("Delete failed");

    }

    setDeleteWasteItem(null);

};
const filteredWaste = wasteList.filter((waste) => {

    const matchesSearch =
        waste.title.toLowerCase().includes(search.toLowerCase()) ||
        waste.wasteType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "ALL" ||
        waste.status === statusFilter;

    return matchesSearch && matchesStatus;

});
const getStatusColor = (status) => {

    switch (status) {

        case "AVAILABLE":
            return "bg-green-100 text-green-700";

        case "RESERVED":
            return "bg-orange-100 text-orange-700";

        case "COMPLETED":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};

    return (

        <div className="p-6 md:p-8">

            <PageHeader
                title="📦 My Waste"
                subtitle="Manage all your published recyclable waste."
            />
            <div className="flex flex-col md:flex-row gap-4 mb-8">

    <input
        type="text"
        placeholder="🔍 Search waste..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
    />

    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
    >
        <option value="ALL">All Status</option>
        <option value="AVAILABLE">Available</option>
        <option value="RESERVED">Reserved</option>
        <option value="COMPLETED">Completed</option>
    </select>

</div>

            <div className="space-y-6">
                {filteredWaste.length === 0 ? (

        <AppCard>

            <div className="text-center py-14">

                <div className="text-7xl">
                    🌱
                </div>

                <h2 className="text-2xl font-bold mt-5">
                    No Waste Found
                </h2>

                <p className="text-gray-500 mt-3">
                    Try changing your search or create a new waste listing.
                </p>

                <button
                    onClick={() => navigate("/generator/create")}
                    className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
                >
                    Create Waste
                </button>

            </div>

        </AppCard>
        

    ) : (
         filteredWaste.map((waste) => (

                    <AppCard key={waste.id}>

                        <div className="flex flex-col lg:flex-row justify-between gap-6">

                            <div>
                                {waste.imageUrl ? (

    <img
        src={waste.imageUrl}
        alt={waste.title}
        className="w-44 h-32 object-cover rounded-xl mb-3"
    />

) : (

    <div className="text-5xl mb-3">

        {waste.wasteType === "PLASTIC" && "🥤"}
        {waste.wasteType === "PAPER" && "📄"}
        {waste.wasteType === "METAL" && "🔩"}
        {waste.wasteType === "GLASS" && "🍾"}
        {waste.wasteType === "ORGANIC" && "🍃"}
        {waste.wasteType === "E_WASTE" && "💻"}
        {waste.wasteType === "TEXTILE" && "👕"}
        {waste.wasteType === "OTHER" && "♻️"}

    </div>

)}

                                <h2 className="text-2xl font-bold text-green-700">

                                    {waste.title}

                                </h2>

                                <p className="mt-2 text-gray-600">

                                    {waste.description}

                                </p>

                                <p className="mt-4">

                                    <strong>Waste Type:</strong> {waste.wasteType}

                                </p>

                                <p>

                                    <strong>Quantity:</strong> {waste.quantity} {waste.quantityUnit}

                                </p>

                            </div>

                            <div className="flex flex-col gap-3">

                                <span
    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(waste.status)}`}
>

    {waste.status}

</span>

                                <button
    onClick={() => navigate(`/generator/edit/${waste.id}`)}
    className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition"
>
    Edit
</button>

                                <button
    onClick={() => handleDeleteClick(waste)}
    className="bg-red-600 text-white rounded-lg px-5 py-2 hover:bg-red-700 transition"
>
    Delete
</button>
<button
    onClick={() =>
        window.open(
            `https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`,
            "_blank"
        )
    }
    className="bg-green-600 text-white rounded-lg px-5 py-2 hover:bg-green-700 transition"
>
    📍 View Map
</button>

<button
    onClick={() =>
        navigate(`/generator/recyclers/${waste.id}`)
    }
    className="bg-purple-600 text-white rounded-lg px-5 py-2 hover:bg-purple-700 transition"
>
    🤝 Find Recycling Partners
</button>
                            </div>

                        </div>

                    </AppCard>

                ))
            )}

            </div>
            <DeleteModal
    open={deleteWasteItem !== null}
    title={deleteWasteItem?.title}
    onCancel={() => setDeleteWasteItem(null)}
    onDelete={confirmDelete}
/>

        </div>

    );

    
}
