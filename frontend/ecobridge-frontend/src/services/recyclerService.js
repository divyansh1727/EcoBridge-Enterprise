import recyclerApi from "../api/recyclerApi";

export const createRecycler = (data) => {
    return recyclerApi.post("/api/v1/recyclers", data);
};

export const getMyRecycler = () => {
    return recyclerApi.get("/api/v1/recyclers/my");
};

export const getRecyclerById = (id) => {
    return recyclerApi.get(`/api/v1/recyclers/${id}`);
};

export const updateRecycler = (id, data) => {
    return recyclerApi.put(`/api/v1/recyclers/${id}`, data);
};