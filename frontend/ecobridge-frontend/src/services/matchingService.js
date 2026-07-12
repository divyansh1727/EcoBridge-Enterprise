import api from "../api/axios";

export const getNearbyWaste = (latitude, longitude) => {

    return api.get(
        "/api/v1/matching/nearby",
        {
            params: {
                latitude,
                longitude,
            },
        }
    );

};

export const getNearbyRecyclers = (latitude, longitude) => {

    return api.get(
        "/api/v1/matching/recyclers-nearby",
        {
            params: {
                latitude,
                longitude,
            },
        }
    );

};

export const getPublicRecyclers = (latitude, longitude) => {

    return api.get(
        "/api/v1/matching/public-recyclers",
        {
            params: {
                latitude,
                longitude,
            },
        }
    );

};