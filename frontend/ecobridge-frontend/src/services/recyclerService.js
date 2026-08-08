import api from "../api/axios";

export const createRecycler = (data) => {
    return api.post("/api/v1/recyclers", data);
};

export const getMyRecycler = () => {
    return api.get("/api/v1/recyclers/my");
};