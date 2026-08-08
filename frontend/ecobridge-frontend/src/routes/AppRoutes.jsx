import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CreateWaste from "../pages/CreateWaste";
import EditWaste from "../pages/EditWaste";

import GeneratorLayout from "../layouts/GeneratorLayout";
import RecyclerLayout from "../layouts/RecyclerLayout";

import GeneratorDashboard from "../components/GeneratorDashboard";
import RecyclerDashboard from "../components/RecyclerDashboard";

import MyWaste from "../pages/MyWaste";
import Profile from "../pages/Profile";
import BrowseWaste from "../pages/BrowseWaste";
import ProtectedRoute from "../components/ProtectedRoute";
import EditProfile from "../pages/EditProfile";
import WasteDetails from "../pages/WasteDetails";
import MyPickups from "../pages/MyPickups";
import PickupHistory from "../pages/PickupHistory";

import RecyclerProfile from "../pages/RecyclerProfile";
import RecyclerEditProfile from "../pages/RecyclerEditProfile";
import RecyclerDetails from "../pages/RecyclerDetails";

import OAuthSuccess from "../pages/OAuthSuccess";
import OAuthFailure from "../pages/OAuthFailure";

import NearbyRecyclers from "../pages/NearbyRecyclers";
import Notifications from "../pages/Notifications";

export default function AppRoutes() {
    return (
        <Routes>

            {/* =========================
                PUBLIC
            ========================= */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* =========================
                GENERATOR
            ========================= */}

            <Route
                path="/generator"
                element={
                    <ProtectedRoute>
                        <GeneratorLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<GeneratorDashboard />}
                />

                <Route
                    path="create"
                    element={<CreateWaste />}
                />

                <Route
                    path="edit/:id"
                    element={<EditWaste />}
                />

                <Route
                    path="my-waste"
                    element={<MyWaste />}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                />

                <Route
                    path="notifications"
                    element={<Notifications />}
                />

                <Route
                    path="edit-profile"
                    element={<EditProfile />}
                />

                <Route
                    path="recyclers/:wasteId"
                    element={<NearbyRecyclers />}
                />
            </Route>


            {/* =========================
                RECYCLER
            ========================= */}

            <Route
                path="/recycler"
                element={
                    <ProtectedRoute>
                        <RecyclerLayout />
                    </ProtectedRoute>
                }
            >

                {/* /recycler */}
                <Route
                    index
                    element={<RecyclerDashboard />}
                />

                {/* /recycler/details */}
                <Route
                    path="details"
                    element={<RecyclerDetails />}
                />

                {/* /recycler/browse */}
                <Route
                    path="browse"
                    element={<BrowseWaste />}
                />

                {/* /recycler/waste/:id */}
                <Route
                    path="waste/:id"
                    element={<WasteDetails />}
                />

                {/* /recycler/my-pickups */}
                <Route
                    path="my-pickups"
                    element={<MyPickups />}
                />

                {/* /recycler/history */}
                <Route
                    path="history"
                    element={<PickupHistory />}
                />

                {/* /recycler/profile */}
                <Route
                    path="profile"
                    element={<RecyclerProfile />}
                />

                {/* /recycler/notifications */}
                <Route
                    path="notifications"
                    element={<Notifications />}
                />

                {/* /recycler/edit-profile */}
                <Route
                    path="edit-profile"
                    element={<RecyclerEditProfile />}
                />

            </Route>


            {/* =========================
                OAUTH
            ========================= */}

            <Route
                path="/oauth/success"
                element={<OAuthSuccess />}
            />

            <Route
                path="/oauth/failure"
                element={<OAuthFailure />}
            />


            {/* =========================
                FALLBACK
            ========================= */}

            <Route
    path="*"
    element={<Navigate to="/" replace />}
/>

        </Routes>
    );
}