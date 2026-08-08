import matchingApi from "../api/matchingAxios";

export const getNearbyWaste = (latitude, longitude) => {
    return matchingApi.get("/api/v1/matching/nearby", {
        params: {
            latitude,
            longitude,
        },
    });
};

export const getPublicRecyclers = (latitude, longitude) => {
    return matchingApi.get("/api/v1/matching/public-recyclers", {
        params: {
            latitude,
            longitude,
        },
    });
};