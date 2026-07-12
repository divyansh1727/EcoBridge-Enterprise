import { Outlet } from "react-router-dom";
import RecyclerSidebar from "../components/RecyclerSidebar";
import RecyclerNavbar from "../components/RecyclerNavbar";

export default function RecyclerLayout() {

    return (

        <div className="min-h-screen flex bg-gray-100">

            <RecyclerSidebar />

            <div className="flex-1 flex flex-col">

                <RecyclerNavbar />

                <main className="flex-1 p-6 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}