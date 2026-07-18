import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaUserShield,
    FaEdit,
} from "react-icons/fa";

export default function RecyclerProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await api.get("/api/v1/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadProfile();
    }, []);

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#101411]">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#A4B465] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101411] p-6 md:p-8">
            <PageHeader
                title="My Profile"
                subtitle="Manage your recycler account information."
            />

            <AppCard>
                <div className="space-y-6 text-white">
                    {/* Profile Detail Fields */}
                    <div className="grid gap-6 sm:">
                        <div>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                                <FaUser className="text-[#A4B465]" /> Name
                            </p>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                                <FaEnvelope className="text-[#A4B465]" /> Email
                            </p>
                            <p className="text-lg text-gray-200">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                                <FaPhone className="text-[#A4B465]" /> Phone Number
                            </p>
                            <p className="text-lg text-gray-200">
                                {user.phoneNumber || "Not Added"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                                <FaUserShield className="text-[#A4B465]" /> Role
                            </p>
                            <p className="text-lg text-gray-200">
                                {user.roles?.[0]?.name || "RECYCLER"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                                <FaCalendarAlt className="text-[#A4B465]" /> Member Since
                            </p>
                            <p className="text-lg text-gray-200">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }) : "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <button
                            onClick={() => navigate("/recycler/edit-profile")}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md"
                        >
                            <FaEdit />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </AppCard>
        </div>
    );
}