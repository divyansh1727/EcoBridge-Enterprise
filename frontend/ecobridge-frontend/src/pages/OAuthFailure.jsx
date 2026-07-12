import { useNavigate } from "react-router-dom";

export default function OAuthFailure() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen flex justify-center items-center bg-green-950 text-white">

            <div className="bg-white text-black p-8 rounded-xl text-center">

                <h2 className="text-2xl font-bold text-red-600">
                    Authentication Failed
                </h2>

                <p className="mt-4">
                    Google/GitHub login failed.
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                    Back to Login
                </button>

            </div>

        </div>

    );

}