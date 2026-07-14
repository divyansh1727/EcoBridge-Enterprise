import { Outlet } from "react-router-dom";
import { useState } from "react";

import GeneratorSidebar from "../components/layout/GeneratorSidebar";
import GeneratorNavbar from "../components/layout/GeneratorNavbar";

export default function GeneratorLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

    <div className="flex min-h-screen bg-[#101411]">

        <GeneratorSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">

            <GeneratorNavbar
                setSidebarOpen={setSidebarOpen}
            />

            <main className="flex-1 overflow-y-auto">

                <Outlet />

            </main>

        </div>

    </div>

);

}