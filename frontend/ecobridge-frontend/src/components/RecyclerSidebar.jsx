import { NavLink } from "react-router-dom";

export default function RecyclerSidebar() {

    const linkStyle = ({ isActive }) =>
        `block p-3 rounded-xl transition ${
            isActive
                ? "bg-green-600 text-white"
                : "hover:bg-green-700"
        }`;

    return (

        <aside className="w-64 min-h-screen bg-green-800 text-white p-6 flex flex-col">

            <h1 className="text-3xl font-bold mb-10">

                ♻️ EcoBridge

            </h1>

            <nav className="flex flex-col gap-3">

                <NavLink
    to="/recycler"
    className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition ${
            isActive
                ? "bg-white text-green-700 font-semibold shadow"
                : "hover:bg-green-700"
        }`
    }
>
    Dashboard
</NavLink>

                <NavLink
    to="/recycler/browse"
    className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition ${
            isActive
                ? "bg-white text-green-700 font-semibold shadow"
                : "hover:bg-green-700"
        }`
    }
>
    Browse Waste
</NavLink>

                <NavLink
    to="/recycler/my-pickups"
    className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition ${
            isActive
                ? "bg-white text-green-700 font-semibold shadow"
                : "hover:bg-green-700"
        }`
    }
>
    My Pickups
</NavLink>

                <NavLink
    to="/recycler/history"
    className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition ${
            isActive
                ? "bg-white text-green-700 font-semibold shadow"
                : "hover:bg-green-700"
        }`
    }
>
     Pickups History
</NavLink>

                <NavLink
    to="/recycler/profile"
    className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition ${
            isActive
                ? "bg-white text-green-700 font-semibold shadow"
                : "hover:bg-green-700"
        }`
    }
>
    👤 Profile
</NavLink>

            </nav>

        </aside>

    );

}