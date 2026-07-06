import api from "../api/axios";

export const register = (data) => {
    return api.post("/api/v1/auth/register", data);
};

export const login = (data) => {
    return api.post("/api/v1/auth/login", data);
};

export const logout = () => {
    return api.post("/api/v1/auth/logout");
};

export const getCurrentUser = () => {
    return api.get("/api/v1/users/me");
};
