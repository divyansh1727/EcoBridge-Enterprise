import { Outlet } from "react-router-dom";
import { useState } from "react";

import RecyclerSidebar from "../components/RecyclerSidebar";
import RecyclerNavbar from "../components/RecyclerNavbar";

export default function RecyclerLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex min-h-screen bg-[#101411]">

            <RecyclerSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">

                <RecyclerNavbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}