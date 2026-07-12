import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    getWasteById,
    updateWaste
} from "../services/wasteService";
export default function CreateWaste({
    editMode = false
}) {

    const [form, setForm] = useState({
        title: "",
        description: "",
        wasteType: "",
        quantity: "",
        quantityUnit: "KG",
        address: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
        pickupStart: "",
        pickupEnd: ""
    });
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const getCurrentLocation = () => {

    if (!navigator.geolocation) {

        toast.error("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            setForm(prev => ({

                ...prev,

                latitude: position.coords.latitude,

                longitude: position.coords.longitude

            }));

            toast.success("📍 Location detected!");

        },

        () => {

            toast.error("Unable to fetch location.");

        }

    );

};
    const { id } = useParams();
   useEffect(() => {

    if (!editMode) return;

    const loadWaste = async () => {

        try {

            const response = await getWasteById(id);

            setForm(response.data);

        } catch (err) {

            console.error(err);

            toast.error("Unable to load waste");

        }

    };

    loadWaste();

}, [editMode, id]);
useEffect(() => {

    const handleBeforeUnload = (e) => {

        if (!isDirty) return;

        e.preventDefault();

        e.returnValue = "";

    };

    window.addEventListener(
        "beforeunload",
        handleBeforeUnload
    );

    return () =>
        window.removeEventListener(
            "beforeunload",
            handleBeforeUnload
        );

}, [isDirty]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setIsDirty(true);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let imageUrl = "";

if (image) {

    const formData = new FormData();

    formData.append("file", image);

    const token = localStorage.getItem("accessToken");

    const uploadResponse = await api.post(
        "/api/v1/upload",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    imageUrl = uploadResponse.data.url;

}

        try {

            const token = localStorage.getItem("accessToken");

           if (editMode) {

    await updateWaste(
    id,
    {
        ...form,
        imageUrl: imageUrl || form.imageUrl
    }
);
    setIsDirty(false);

    toast.success("Waste updated successfully!");

} else {

    await api.post(
        "/api/v1/waste",
        {
            ...form,
            imageUrl
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
    );

    toast.success("🌱 Waste published successfully!");

}

setTimeout(() => {
    navigate("/generator");
}, 1200);

        } catch (err) {

            console.error(err);

            toast.error("Failed to create waste");

        }

    };
    const inputStyle =
    "w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition";

    return (

        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-10 px-6">

            <div className="max-w-4xl mx-auto mb-8">

    <h1 className="text-5xl font-bold text-green-700">
        {editMode ? "✏️ Edit Waste" : "🌱 Create Waste"}
    </h1>

    <p className="text-gray-600 mt-3 text-lg">
        {editMode
            ? "Update your published waste details."
            : "Publish recyclable waste so nearby recyclers can discover and collect it."}
    </p>

</div>

            <form
    onSubmit={handleSubmit}
    className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-green-100"
>

                <div>

    <label className="block mb-2 font-semibold text-gray-700">
        Waste Title
    </label>
    {form.imageUrl && (

    <img
        src={form.imageUrl}
        alt="Waste"
        className="w-48 h-36 rounded-xl object-cover mb-4"
    />

)}

    <input
    name="title"
    value={form.title}
    onChange={handleChange}
    className={inputStyle}
    placeholder="Plastic Bottles, Cardboard Boxes..."
/>

</div>
                <div>

    <label className="block mb-2 font-semibold text-gray-700">
        Description
    </label>

    <textarea
        rows={4}
        name="description"
        value={form.description}
        onChange={handleChange}
        className={inputStyle}
        placeholder="Describe the waste..."
    />

</div>

                <div>

    <label className="block mb-2 font-semibold text-gray-700">
        Waste Type
    </label>

    <select
        name="wasteType"
        value={form.wasteType}
        onChange={handleChange}
        className={inputStyle}
    >
        <option value="">Select Waste Type</option>
        <option>PLASTIC</option>
        <option>PAPER</option>
        <option>METAL</option>
        <option>GLASS</option>
        <option>ORGANIC</option>
        <option>E_WASTE</option>
        <option>TEXTILE</option>
        <option>OTHER</option>
    </select>

</div>

                <div className="grid md:grid-cols-2 gap-6">

      <div>

        <label className="block mb-2 font-semibold text-gray-700">
            Quantity
        </label>

        <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className={inputStyle}
        />

    </div>

    <div>

        <label className="block mb-2 font-semibold text-gray-700">
            Unit
        </label>

        <select
            name="quantityUnit"
            value={form.quantityUnit}
            onChange={handleChange}
            className={inputStyle}
        >
            <option>KG</option>
            <option>GRAM</option>
            <option>TON</option>
        </select>

    </div>

</div>

                <div>

    <label className="block mb-2 font-semibold text-gray-700">
        Pickup Address
    </label>

    <input
        name="address"
        value={form.address}
        onChange={handleChange}
        className={inputStyle}
        placeholder="Enter pickup location"
    />

</div>
<div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    step="any"
                    name="latitude"
                    placeholder="Latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="number"
                    step="any"
                    name="longitude"
                    placeholder="Longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    className={inputStyle}
                />
                </div>
                <div className="flex justify-end">

    <button
        type="button"
        onClick={getCurrentLocation}
        className="mt-2 px-5 py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
    >

        📍 Use Current Location

    </button>

</div>

                <button
    type="submit"
    className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 transition text-white text-lg font-bold shadow-lg"
>
    {editMode ? "💾 Update Waste" : "🌱 Publish Waste"}
</button>
<input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
/>
            </form>

        </div>

    );

}