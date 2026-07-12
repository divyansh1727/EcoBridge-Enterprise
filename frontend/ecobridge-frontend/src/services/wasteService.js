import api from "../api/axios";

export const getMyWaste = () => {
    return api.get("/api/v1/waste/my");
};

export const createWaste = (data) => {
    return api.post("/api/v1/waste", data);
};

export const updateWaste = (id, data) => {
    return api.put(`/api/v1/waste/${id}`, data);
};

export const deleteWaste = (id) => {
    return api.delete(`/api/v1/waste/${id}`);
};

export const getWasteById = (id) => {
    return api.get(`/api/v1/waste/${id}`);
};

export const getAvailableWaste = () => {

    return api.get(
        "/api/v1/waste/available"
    );

};

export const reserveWaste = (id) => {

    return api.put(
        `/api/v1/waste/${id}/reserve`
    );

};

export const getMyPickups = () => {

    return api.get(
        "/api/v1/waste/my-pickups"
    );

};

export const completePickup = (id) => {

    return api.put(
        `/api/v1/waste/${id}/complete`
    );

};

export const getPickupHistory = () => {

    return api.get(
        "/api/v1/waste/pickup-history"
    );

};

export const getRecyclerDashboard = () => {

    return api.get(
        "/api/v1/waste/recycler-dashboard"
    );

};