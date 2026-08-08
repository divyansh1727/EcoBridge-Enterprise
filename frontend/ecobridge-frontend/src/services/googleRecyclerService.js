import { loadGoogleMaps } from "../utils/googleMaps";

export const getGoogleRecyclers = async (
    latitude,
    longitude,
    radiusMeters = 25000
) => {
    await loadGoogleMaps();

    const { Place } = await window.google.maps.importLibrary("places");

    const request = {
        fields: [
            "displayName",
            "formattedAddress",
            "location",
            "googleMapsURI",
            "primaryType",
            "websiteURI",
            "types",
        ],

        locationRestriction: {
            center: {
                lat: latitude,
                lng: longitude,
            },
            radius: radiusMeters,
        },

        includedPrimaryTypes: [
            "recycling_center",
        ],

        maxResultCount: 20,

        rankPreference: "DISTANCE",
    };

    const { places } = await Place.searchNearby(request);

    return (places || []).map((place) => ({
        id: place.id,

        name: place.displayName?.text || "Google Recycler",

        address:
            place.formattedAddress ||
            "Address unavailable",

        latitude: place.location?.lat(),
        longitude: place.location?.lng(),

        googleMapsUri: place.googleMapsURI,

        website: place.websiteURI || null,

        source: "GOOGLE",

        recyclerType: "GOOGLE",
    }));
};