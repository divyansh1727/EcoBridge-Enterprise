import axios from "axios";

const recyclerApi = axios.create({
    baseURL: import.meta.env.VITE_RECYCLER_API,
    withCredentials: true,
});

recyclerApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default recyclerApi;