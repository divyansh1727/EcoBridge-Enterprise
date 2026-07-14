import { NavLink } from "react-router-dom";
import {
    FaRecycle,
    FaHome,
    FaSearch,
    FaTruck,
    FaHistory,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

const links = [
    {
        to: "/recycler",
        label: "Dashboard",
        icon: <FaHome />,
        exact: true, // Used to prevent overlapping active highlights
    },
    {
        to: "/recycler/browse",
        label: "Browse Waste",
        icon: <FaSearch />,
    },
    {
        to: "/recycler/my-pickups",
        label: "My Pickups",
        icon: <FaTruck />,
    },
    {
        to: "/recycler/history",
        label: "History",
        icon: <FaHistory />,
    },
    {
        to: "/recycler/profile",
        label: "Profile",
        icon: <FaUser />,
    },
];

export default function RecyclerSidebar({
    sidebarOpen,
    setSidebarOpen,
}) {
    return (
        <aside className="w-72 min-h-screen flex flex-col border-r border-white/10 bg-[#161B18]">
            {/* Header Section */}
            <div className="border-b border-white/10 p-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A4B465]/15">
                        <FaRecycle className="text-2xl text-[#A4B465]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white">
                            EcoBridge
                        </h1>
                        <p className="text-sm text-gray-400">
                            Recycler Portal
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-3 p-6">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.exact}
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                                isActive
                                    ? "bg-[#A4B465]/15 text-[#A4B465] border border-[#A4B465]/20"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`
                        }
                    >
                        <span className="text-lg">
                            {link.icon}
                        </span>
                        <span className="font-semibold">
                            {link.label}
                        </span>
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
                    <FaSignOutAlt className="text-lg" />
                    Logout
                </button>
            </div>
        </aside>
    );
}