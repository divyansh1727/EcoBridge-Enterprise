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
import OAuthSuccess from "../pages/OAuthSuccess";
import OAuthFailure from "../pages/OAuthFailure";
import NearbyRecyclers from "../pages/NearbyRecyclers";
export default function AppRoutes() {

    return (

        <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Generator */}
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
        path="edit-profile"
        element={<EditProfile />}
    />


<Route
    path="recyclers/:wasteId"
    element={<NearbyRecyclers />}
/>
</Route>


            {/* Recycler */}
            <Route
    path="/recycler"
    element={
        <ProtectedRoute>
            <RecyclerLayout />
        </ProtectedRoute>
        
    }
    
>
    <Route
    path="browse"
    element={<BrowseWaste />}
/>
<Route
    path="waste/:id"
    element={<WasteDetails />}
/>
<Route
    path="my-pickups"
    element={<MyPickups />}
/>

<Route
    path="history"
    element={<PickupHistory />}
/>

<Route
    path="profile"
    element={<RecyclerProfile />}
/>

<Route
    path="edit-profile"
    element={<RecyclerEditProfile />}
/>


    <Route
        index
        element={<RecyclerDashboard />}
    />

</Route>
<Route
    path="/oauth/success"
    element={<OAuthSuccess />}
/>

<Route
    path="/oauth/failure"
    element={<OAuthFailure />}
/>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>

    );

}