import { useEffect, useState } from "react";
import api from "../api/axios";
import { Form } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import AppCard from "../components/ui/AppCard";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const [user, setUser] = useState(null);
    const navigate= useNavigate();

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

                setUser(response.data);

            } catch (err) {

                console.error(err);

            }

        };

        loadProfile();

    }, []);

    if (!user) return <div>Loading...</div>;

    return (

        <div className="p-6 md:p-8">

            <PageHeader
                title="👤 My Profile"
                subtitle="View your EcoBridge account details."
            />

            <AppCard>

               <div className="space-y-5">
                <button
    onClick={() => navigate("/generator/edit-profile")}
    className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
>
    ✏️ Edit Profile
</button>

    <div>
        <p className="text-gray-500">Name</p>
        <h2 className="text-2xl font-bold">
            {user.name}
        </h2>
    </div>

    <div>
        <p className="text-gray-500">Email</p>
        <p className="text-lg">
            ✉️ {user.email}
        </p>
    </div>

   <div>
    <p className="text-gray-500">Phone Number</p>

    <p className="text-lg">
        📞 {user.phoneNumber || "Not Added"}
    </p>
</div>

    <div>
        <p className="text-gray-500">Role</p>
        <p className="text-lg">
            🛡 {user.roles?.[0]?.name}
        </p>
        <div>
    <p className="text-gray-500">Member Since</p>
    <p className="text-lg">
        📅 {new Date(user.createdAt).toLocaleDateString()}
    </p>
</div>
    </div>

</div>

            </AppCard>

        </div>

    );

}