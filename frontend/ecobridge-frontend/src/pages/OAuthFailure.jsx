import { useNavigate } from "react-router-dom";

export default function OAuthFailure() {

    const navigate = useNavigate();

    return (

    <div className="flex min-h-screen items-center justify-center bg-[#101411] px-6">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-white/5 p-10 text-center backdrop-blur-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-5xl">

                ❌

            </div>

            <h2 className="mt-8 text-3xl font-bold text-white">

                Authentication Failed

            </h2>

            <p className="mt-4 leading-7 text-gray-400">

                We couldn't sign you in using Google or GitHub.

                Please try again or use another sign-in method.

            </p>

            <button
                onClick={() => navigate("/login")}
                className="
                    mt-10
                    w-full
                    rounded-2xl
                    bg-[#A4B465]
                    py-4
                    font-semibold
                    text-[#101411]
                    transition
                    hover:brightness-110
                "
            >

                Back to Login

            </button>

        </div>

    </div>

);

}