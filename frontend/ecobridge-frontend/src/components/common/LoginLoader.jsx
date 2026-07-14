import gif from "../../assets/eco-loading.gif";

export default function LoginLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100">

            <div className="text-center">

                <img
                    src={gif}
                    alt="Loading"
                    className="w-56 md:w-72 mx-auto rounded-3xl shadow-2xl"
                />

                <h1 className="mt-6 text-4xl font-bold text-emerald-700">
                    EcoBridge
                </h1>

                <p className="mt-3 text-gray-600 text-lg">
                    Preparing your dashboard...
                </p>

                <div className="mt-8 w-60 h-2 rounded-full bg-emerald-200 overflow-hidden mx-auto">

                    <div className="h-full bg-emerald-600 animate-pulse w-full"></div>

                </div>

            </div>

        </div>
    );
}