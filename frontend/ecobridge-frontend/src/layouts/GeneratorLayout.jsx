import { Outlet } from "react-router-dom";
import { useState } from "react";

import GeneratorSidebar from "../components/layout/GeneratorSidebar";
import GeneratorNavbar from "../components/layout/GeneratorNavbar";

export default function GeneratorLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex items-stretch min-h-screen bg-slate-100">

            <GeneratorSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1">

                <GeneratorNavbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="p-4 md:p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}