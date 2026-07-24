import axios from "axios";

const wasteApi = axios.create({
    baseURL: import.meta.env.VITE_WASTE_URL,
    withCredentials: true,
});

wasteApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default wasteApi;