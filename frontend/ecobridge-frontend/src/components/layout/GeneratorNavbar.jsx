import { HiMenu } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import NotificationBell from "../ui/NotificationBell";

export default function GeneratorNavbar({
    setSidebarOpen
}) {

    const name = localStorage.getItem("userName");

    return (

        <header className="sticky top-0 z-40 overflow-visible flex h-20 items-center justify-between border-b border-white/10 bg-[#161B18]/90 px-5 md:px-8 backdrop-blur-xl">

            <div className="flex items-center gap-4">

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-3xl text-[#A4B465] lg:hidden"
                >
                    <HiMenu />
                </button>

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-[#A4B465]">

                        Generator Portal

                    </p>

                    <h2 className="text-2xl md:text-3xl font-black text-white">

                        Dashboard

                    </h2>

                </div>

            </div>

            <div className="flex items-center gap-4">

    <NotificationBell />

    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A4B465]/15">

            <FaLeaf className="text-[#A4B465]" />

        </div>

        <div className="hidden md:block">

            <p className="text-xs text-gray-400">

                Welcome back

            </p>

            <p className="font-semibold text-white">

                {name}

            </p>

        </div>

    </div>

</div>


        </header>

    );

}