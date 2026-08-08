import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
import AppInput from "../components/ui/AppInput";

import { createRecycler } from "../services/recyclerService";
import { createRecycler } from "../services/recyclerService";

import {
    FaBuilding,
    FaMapMarkerAlt,
    FaRecycle,
    FaLocationArrow,
} from "react-icons/fa";

export default function RecyclerDetails() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const [form, setForm] = useState({
        companyName: "",
        recyclerName: "",
        email: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        serviceRadiusKm: "",
        totalCapacity: "",
        recyclerType: "COMPANY",
        acceptedWasteTypes: [],
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await api.get("/api/v1/users/me");

                const user = response.data;

                setForm((prev) => ({
                    ...prev,
                    recyclerName: user.name || "",
                    email: user.email || "",
                    phone: user.phoneNumber || "",
                }));
            } catch (err) {
                console.error(err);
                toast.error("Unable to load your profile");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setForm((prev) => ({
                    ...prev,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }));

                setLocationLoading(false);
                toast.success("Location detected successfully");
            },
            (error) => {
                console.error(error);
                setLocationLoading(false);
                toast.error(
                    "Unable to get location. Please allow location access."
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const toggleWasteType = (wasteType) => {
        setForm((prev) => {
            const exists = prev.acceptedWasteTypes.includes(wasteType);

            return {
                ...prev,
                acceptedWasteTypes: exists
                    ? prev.acceptedWasteTypes.filter(
                          (type) => type !== wasteType
                      )
                    : [...prev.acceptedWasteTypes, wasteType],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        if (!form.address.trim()) {
            toast.error("Address is required");
            return;
        }

        if (!form.phone.trim()) {
            toast.error("Phone number is required");
            return;
        }

        if (!form.latitude || !form.longitude) {
            toast.error("Please detect your location first");
            return;
        }

        if (
            !form.serviceRadiusKm ||
            Number(form.serviceRadiusKm) <= 0
        ) {
            toast.error("Enter a valid service radius");
            return;
        }

        if (
            !form.totalCapacity ||
            Number(form.totalCapacity) <= 0
        ) {
            toast.error("Enter a valid total capacity");
            return;
        }

        if (form.acceptedWasteTypes.length === 0) {
            toast.error("Select at least one accepted waste type");
            return;
        }

        setSaving(true);

        try {
            const payload = {
                companyName: form.companyName.trim(),
                recyclerName: form.recyclerName.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                address: form.address.trim(),
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                serviceRadiusKm: Number(form.serviceRadiusKm),
                totalCapacity: Number(form.totalCapacity),
                recyclerType: form.recyclerType,
                acceptedWasteTypes: form.acceptedWasteTypes,
            };

            await createRecycler(payload);

            toast.success("Recycler details registered successfully!");

            navigate("/recycler");
        } catch (err) {
            console.error(err);

            const message =
                err.response?.data?.message ||
                "Unable to register recycler details";

            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101411]">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="Recycler Details"
                subtitle="Add your recycling business information to EcoBridge."
            />

            <AppCard className="mx-auto max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Information */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <FaBuilding className="text-[#A4B465]" />
                            <h2 className="text-xl font-bold text-white">
                                Business Information
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <AppInput
                                label="Company Name"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                            />

                            <AppInput
                                label="Recycler Name"
                                name="recyclerName"
                                value={form.recyclerName}
                                onChange={handleChange}
                                placeholder="Recycler name"
                            />

                            <AppInput
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email address"
                            />

                            <AppInput
                                label="Phone Number"
                                name="phone"
                                value={form.phone}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if (!/^\d*$/.test(value)) return;
                                    if (value.length > 10) return;

                                    setForm((prev) => ({
                                        ...prev,
                                        phone: value,
                                    }));
                                }}
                                placeholder="9876543210"
                            />
                        </div>
                    </div>

                    {/* Recycler Type */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Recycler Type
                        </label>

                        <select
                            name="recyclerType"
                            value={form.recyclerType}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#A4B465]"
                        >
                            <option
                                value="COMPANY"
                                className="bg-[#101411]"
                            >
                                COMPANY
                            </option>

                            <option
                                value="INDIVIDUAL"
                                className="bg-[#101411]"
                            >
                                INDIVIDUAL
                            </option>
                        </select>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Enter your complete recycling facility address"
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-gray-500 outline-none transition focus:border-[#A4B465]"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <FaMapMarkerAlt className="text-[#A4B465]" />

                            <h2 className="text-xl font-bold text-white">
                                Location
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <AppInput
                                label="Latitude"
                                name="latitude"
                                value={form.latitude}
                                readOnly
                            />

                            <AppInput
                                label="Longitude"
                                name="longitude"
                                value={form.longitude}
                                readOnly
                            />
                        </div>

                        <button
                            type="button"
                            onClick={getLocation}
                            disabled={locationLoading}
                            className="mt-5 flex items-center gap-2 rounded-xl bg-[#A4B465] px-5 py-3 font-semibold text-[#101411] transition hover:bg-[#b8c97a] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <FaLocationArrow />

                            {locationLoading
                                ? "Detecting Location..."
                                : "Use My Current Location"}
                        </button>
                    </div>

                    {/* Capacity */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <FaRecycle className="text-[#A4B465]" />

                            <h2 className="text-xl font-bold text-white">
                                Recycling Capacity
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <AppInput
                                label="Service Radius (KM)"
                                name="serviceRadiusKm"
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={form.serviceRadiusKm}
                                onChange={handleChange}
                                placeholder="Example: 25"
                            />

                            <AppInput
                                label="Total Capacity"
                                name="totalCapacity"
                                type="number"
                                min="1"
                                step="0.1"
                                value={form.totalCapacity}
                                onChange={handleChange}
                                placeholder="Example: 1000"
                            />
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Capacity is currently recorded as a numeric value
                            for your recycling operation.
                        </p>
                    </div>

                    {/* Waste Types */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <FaRecycle className="text-[#A4B465]" />

                            <h2 className="text-xl font-bold text-white">
                                Accepted Waste Types
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {[
                                "PLASTIC",
                                "PAPER",
                                "METAL",
                                "GLASS",
                                "ORGANIC",
                                "EWASTE",
                                "TEXTILE",
                            ].map((wasteType) => {
                                const selected =
                                    form.acceptedWasteTypes.includes(
                                        wasteType
                                    );

                                return (
                                    <button
                                        key={wasteType}
                                        type="button"
                                        onClick={() =>
                                            toggleWasteType(wasteType)
                                        }
                                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                            selected
                                                ? "border-[#A4B465] bg-[#A4B465]/20 text-[#A4B465]"
                                                : "border-white/10 bg-white/5 text-gray-400 hover:border-[#A4B465]/40 hover:text-white"
                                        }`}
                                    >
                                        {wasteType}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end border-t border-white/10 pt-6">
                        <AppButton
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                        >
                            {saving
                                ? "Saving Recycler Details..."
                                : "Save Recycler Details"}
                        </AppButton>
                    </div>
                </form>
            </AppCard>
        </div>
    );
}