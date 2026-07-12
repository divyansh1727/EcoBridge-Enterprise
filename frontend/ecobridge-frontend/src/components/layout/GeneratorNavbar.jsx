import { HiMenu } from "react-icons/hi";

export default function GeneratorNavbar({
    setSidebarOpen
}) {

    const name =
        localStorage.getItem("userName");

    return (

        <header className="h-16 md:h-20 bg-white shadow flex items-center justify-between px-4 md:px-8">

            <div className="flex items-center gap-4">

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-3xl text-green-700 lg:hidden"
                >
                    <HiMenu />
                </button>

                <h2 className="text-lg md:text-2xl font-bold text-green-700">

                    Generator Dashboard

                </h2>

            </div>

            <div className="font-semibold text-sm md:text-base">

                👋 {name}

            </div>

        </header>

    );

}