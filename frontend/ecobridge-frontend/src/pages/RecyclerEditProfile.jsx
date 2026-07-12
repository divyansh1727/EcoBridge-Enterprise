import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";

export default function RecyclerEditProfile() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phoneNumber: ""
    });

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const token = localStorage.getItem("accessToken");

                const response = await api.get(
                    "/api/v1/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setForm({
                    name: response.data.name || "",
                    phoneNumber: response.data.phoneNumber || ""
                });

            } catch (err) {

                console.error(err);

            }

        };

        loadProfile();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        

        try {

            const token = localStorage.getItem("accessToken");

            const userId = localStorage.getItem("userId");

            await api.put(
                `/api/v1/users/${userId}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Profile updated!");

            navigate("/recycler/profile");

        } catch (err) {

            console.error(err);

            toast.error("Update failed");

        }

    };

    return (

        <div className="p-6 md:p-8">

            <PageHeader
                title="✏️ Edit Profile"
                subtitle="Update your personal information."
            />

            <AppCard>

                <form
                
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label>Name</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-2 rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label>Phone Number</label>

                        <input
    type="text"
    name="phoneNumber"
    value={form.phoneNumber}
    onChange={(e) => {

        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        if (value.length > 10) return;

        setForm({
            ...form,
            phoneNumber: value
        });

    }}
    placeholder="9876543210"
    className="w-full mt-2 rounded-xl border p-3"
/>

                    </div>

                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >

                        Save Changes

                    </button>

                </form>

            </AppCard>

        </div>

    );

}