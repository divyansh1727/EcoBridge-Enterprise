import { FaRecycle } from "react-icons/fa";

export default function RecyclerNavbar({
    setSidebarOpen,
}) {

    const name = localStorage.getItem("userName");

    return (

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#161B18]/90 px-8 backdrop-blur-xl">

            <div>

                <p className="text-sm uppercase tracking-[0.25em] text-[#A4B465]">

                    Recycler Portal

                </p>

                <h2 className="mt-1 text-3xl font-black text-white">

                    Recycler Dashboard

                </h2>

            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A4B465]/15">

                    <FaRecycle className="text-[#A4B465]" />

                </div>

                <div>

                    <p className="text-xs text-gray-400">

                        Welcome back

                    </p>

                    <p className="font-semibold text-white">

                        {name}

                    </p>

                </div>

            </div>

        </header>

    );

}