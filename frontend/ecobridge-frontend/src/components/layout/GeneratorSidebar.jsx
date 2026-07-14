import { NavLink } from "react-router-dom";
import {
    HiHome,
    HiPlusCircle,
    HiCollection,
    HiUser,
    HiX,
    HiLogout,
} from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";

export default function GeneratorSidebar({ sidebarOpen, setSidebarOpen }) {
    const menuItems = [
        {
            name: "Dashboard",
            icon: <HiHome />,
            path: "/generator",
            exact: true, // Used to pass the "end" attribute for precise matching
        },
        {
            name: "Create Waste",
            icon: <HiPlusCircle />,
            path: "/generator/create",
        },
        {
            name: "My Waste",
            icon: <HiCollection />,
            path: "/generator/my-waste",
        },
        {
            name: "Profile",
            icon: <HiUser />,
            path: "/generator/profile",
        },
    ];

    return (
        <>
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 flex min-h-screen w-72 flex-col border-r border-white/10 bg-[#161B18] transition-transform duration-300 lg:static ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between border-b border-white/10 p-7">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A4B465]/15">
                            <FaLeaf className="text-2xl text-[#A4B465]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">EcoBridge</h1>
                            <p className="text-sm text-gray-400">Generator Portal</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-3xl text-white lg:hidden"
                    >
                        <HiX />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-3 p-6">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.exact} // Prevents multiple highlights at once
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                                    isActive
                                        ? "border border-[#A4B465]/30 bg-[#A4B465]/15 text-[#A4B465]"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-semibold">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Action Panel */}
                <div className="border-t border-white/10 p-6">
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-500"
                    >
                        <HiLogout className="text-xl" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}