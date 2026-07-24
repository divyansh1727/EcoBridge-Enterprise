import axios from "axios";

const matchingApi = axios.create({
    baseURL: import.meta.env.VITE_MATCHING_API,
    withCredentials: true,
});

matchingApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default matchingApi;