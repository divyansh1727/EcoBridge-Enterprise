import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
import AppInput from "../components/ui/AppInput";
export default function EditProfile() {

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

            const role = localStorage.getItem("userRole");

navigate(
    role === "ROLE_RECYCLER"
        ? "/recycler/profile"
        : "/generator/profile"
);

        } catch (err) {

            console.error(err);

            toast.error("Update failed");

        }

    };

    return (

        <div className="min-h-screen bg-[#101411] p-6 md:p-8">

            <PageHeader
    title="Edit Profile"
    subtitle="Keep your EcoBridge account information up to date."
/>

            <AppCard className="max-w-3xl">

                <form
                
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <AppInput
    label="Full Name"
    name="name"
    value={form.name}
    onChange={handleChange}
/>

                    </div>

                    <div>

                        <AppInput
    label="Phone Number"
    type="text"
    name="phoneNumber"
    placeholder="9876543210"
    value={form.phoneNumber}
    onChange={(e) => {

        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        if (value.length > 10) return;

        setForm({
            ...form,
            phoneNumber: value,
        });

    }}
/>

                    </div>

                    <AppButton
    type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >

                        Save Changes

                    </AppButton>

                </form>

            </AppCard>

        </div>

    );

}