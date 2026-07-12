import { NavLink } from "react-router-dom";
import {
    HiHome,
    HiPlusCircle,
    HiCollection,
    HiUser,
    HiX,
    HiLogout
} from "react-icons/hi";

export default function GeneratorSidebar({
    sidebarOpen,
    setSidebarOpen
}) {

    const menuItems = [
        {
            name: "Dashboard",
            icon: <HiHome />,
            path: "/generator"
        },
        {
            name: "Create Waste",
            icon: <HiPlusCircle />,
            path: "/generator/create"
        },
        {
            name: "My Waste",
            icon: <HiCollection />,
            path: "/generator/my-waste"
        },
        {
            name: "Profile",
            icon: <HiUser />,
            path: "/generator/profile"
        }
    ];

    return (
        <>
            {/* Dark Background */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                fixed lg:static
                top-0 left-0
                min-h-screen
                w-72
                bg-green-800
                text-white
                z-50
                transform
                transition-transform
                duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
                `}
            >

                <div className="flex items-center justify-between p-6 border-b border-green-700">

                    <h1 className="text-3xl font-bold">

                        🌱 EcoBridge

                    </h1>

                    <button
                        className="text-3xl lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <HiX />
                    </button>

                </div>

                <nav className="flex flex-col p-4 gap-2">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-4 rounded-xl transition
                                ${
                                    isActive
                                        ? "bg-white text-green-700 font-bold"
                                        : "hover:bg-green-700"
                                }`
                            }
                        >

                            <span className="text-2xl">

                                {item.icon}

                            </span>

                            {item.name}

                        </NavLink>

                    ))}

                </nav>

                <div className="absolute bottom-5 left-4 right-4">

                    <button
                        className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold"
                        onClick={() => {

                            localStorage.clear();

                            window.location.href = "/";

                        }}
                    >

                        <HiLogout />

                        Logout

                    </button>

                </div>

            </aside>
        </>
    );

}