import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/oauthService";
import toast from "react-hot-toast";

export default function OAuthSuccess() {

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {

        const loadUser = async () => {

            try {

                const token = params.get("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                localStorage.setItem("accessToken", token);

                const response = await getCurrentUser();

                const user = response.data;

                localStorage.setItem("userId", user.id);
                localStorage.setItem("userName", user.name);
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userRole", user.roles[0].name);

                login({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.roles[0].name
                });

                toast.success("Login Successful!");

                switch (user.roles[0].name) {

                    case "ROLE_ADMIN":
                        navigate("/admin/dashboard");
                        break;

                    case "ROLE_RECYCLER":
                        navigate("/recycler");
                        break;

                    default:
                        navigate("/generator");

                }

            } catch (e) {

                navigate("/login");

            }

        };

        loadUser();

    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-green-950 text-white">

            <div className="text-center">

                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <h2 className="mt-6 text-2xl font-bold">
                    Signing you in...
                </h2>

            </div>

        </div>
    );

}