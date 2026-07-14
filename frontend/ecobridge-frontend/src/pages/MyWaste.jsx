import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import { getMyWaste, deleteWaste } from "../services/wasteService";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/ui/DeleteModal";
import toast from "react-hot-toast";
import AppInput from "../components/ui/AppInput";
import AppButton from "../components/ui/AppButton";
import { FaBoxOpen, FaMapMarkerAlt, FaHandshake } from "react-icons/fa";

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
                setWasteList(response.data || []);
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
            setWasteList((prev) => prev.filter((w) => w.id !== deleteWasteItem.id));
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

        const matchesStatus = statusFilter === "ALL" || waste.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "AVAILABLE":
                return "bg-green-500/20 text-green-400";
            case "RESERVED":
                return "bg-orange-500/20 text-orange-400";
            case "COMPLETED":
                return "bg-blue-500/20 text-blue-400";
            default:
                return "bg-gray-500/20 text-gray-300";
        }
    };

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8 text-white">
            <PageHeader
                title="My Waste"
                subtitle="Manage all your published recyclable waste."
            />

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 mt-6">
                <AppInput
                    type="text"
                    placeholder="Search waste..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none focus:border-[#A4B465] focus:ring-2 focus:ring-[#A4B465]/20"
                >
                    <option className="bg-[#101411]" value="ALL">All Status</option>
                    <option className="bg-[#101411]" value="AVAILABLE">Available</option>
                    <option className="bg-[#101411]" value="RESERVED">Reserved</option>
                    <option className="bg-[#101411]" value="COMPLETED">Completed</option>
                </select>
            </div>

            {/* Waste Listings Container */}
            <div className="space-y-6">
                {filteredWaste.length === 0 ? (
                    <AppCard>
                        <div className="text-center py-14">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A4B465]/10 text-4xl text-[#A4B465]">
                                <FaBoxOpen />
                            </div>
                            <h2 className="text-2xl font-bold mt-5 text-white">No Waste Found</h2>
                            <p className="text-gray-400 mt-3">
                                Try changing your search or create a new waste listing.
                            </p>
                            <AppButton
                                onClick={() => navigate("/generator/create")}
                                className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                                Create Waste
                            </AppButton>
                        </div>
                    </AppCard>
                ) : (
                    filteredWaste.map((waste) => (
                        <AppCard key={waste.id}>
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    {waste.imageUrl ? (
                                        <img
                                            src={waste.imageUrl}
                                            alt={waste.title}
                                            className="mb-5 h-48 w-full rounded-2xl object-cover"
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

                                    <h2 className="text-2xl font-bold text-white">{waste.title}</h2>
                                    <p className="mt-2 text-gray-400 leading-7">{waste.description}</p>
                                    
                                    <div className="mt-4 space-y-1 text-sm text-gray-300">
                                        <p><strong>Waste Type:</strong> {waste.wasteType}</p>
                                        <p><strong>Quantity:</strong> {waste.quantity} {waste.quantityUnit}</p>
                                    </div>
                                </div>

                                {/* Action Buttons Panel */}
                                <div className="flex flex-col gap-3 min-w-[200px] justify-start">
                                    <span className={`px-4 py-2 rounded-xl text-center font-semibold ${getStatusColor(waste.status)}`}>
                                        {waste.status}
                                    </span>

                                    <AppButton
                                        onClick={() => navigate(`/generator/edit/${waste.id}`)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Edit
                                    </AppButton>

                                    <AppButton
                                        onClick={() => handleDeleteClick(waste)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Delete
                                    </AppButton>

                                    <AppButton
                                        onClick={() => window.open(`https://www.google.com/maps?q=${waste.latitude},${waste.longitude}`, "_blank")}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <FaMapMarkerAlt className="mr-2 inline" /> View Map
                                    </AppButton>

                                    <AppButton
                                        onClick={() => navigate(`/generator/recyclers/${waste.id}`)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        <FaHandshake className="mr-2 inline" /> Find Partners
                                    </AppButton>
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