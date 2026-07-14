export default function SplashScreen() {

    return (

        <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-emerald-950 via-green-900 to-black flex items-center justify-center">

            <div className="text-center">

                <div className="w-28 h-28 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">

                    <span className="text-5xl">
                        🌱
                    </span>

                </div>

                <h1 className="mt-8 text-5xl font-extrabold text-white">

                    EcoBridge

                </h1>

                <p className="mt-4 text-green-200 text-lg">

                    Bridging Waste. Building a Sustainable Tomorrow.

                </p>

                <div className="flex justify-center gap-2 mt-10">

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce"></div>

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce delay-150"></div>

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce delay-300"></div>

                </div>

            </div>

        </div>

    );

}