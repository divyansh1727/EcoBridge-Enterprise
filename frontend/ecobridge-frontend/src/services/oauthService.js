import api from "./api";

export const getCurrentUser = () => {
    return api.get("/api/v1/auth/me");
};