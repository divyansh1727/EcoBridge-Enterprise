import { loadGoogleMaps } from "../utils/googleMaps";

export const getGoogleRecyclers = async (
    latitude,
    longitude,
    radiusMeters = 25000
) => {
    await loadGoogleMaps();

    const { Place } =
        await window.google.maps.importLibrary("places");

    const fields = [
        "displayName",
        "formattedAddress",
        "location",
        "googleMapsURI",
        "primaryType",
        "websiteURI",
        "types",
    ];

    const queries = [
        "recycling center",
        "recycling centre",
        "scrap dealer",
        "scrap metal dealer",
        "waste recycling",
        "e-waste recycling",
    ];

    const allPlaces = [];

    for (const query of queries) {
        try {
            const request = {
                textQuery: query,

                fields,

                locationBias: {
                    center: {
                        lat: latitude,
                        lng: longitude,
                    },
                    radius: radiusMeters,
                },

                maxResultCount: 20,

                language: "en",
            };

            const { places } =
                await Place.searchByText(request);

            if (places?.length) {
                allPlaces.push(...places);
            }

        } catch (error) {
            console.error(
                `Google Places search failed for "${query}"`,
                error
            );
        }
    }

    // Remove duplicates
    const uniquePlaces = Array.from(
        new Map(
            allPlaces
                .filter((place) => place.id)
                .map((place) => [
                    place.id,
                    place,
                ])
        ).values()
    );

    return uniquePlaces.map((place) => ({
        id: place.id,

        name:
            place.displayName?.text ||
            "Google Recycling Business",

        address:
            place.formattedAddress ||
            "Address unavailable",

        latitude:
            place.location?.lat(),

        longitude:
            place.location?.lng(),

        googleMapsUri:
            place.googleMapsURI || null,

        website:
            place.websiteURI || null,

        primaryType:
            place.primaryType || null,

        types:
            place.types || [],

        source: "GOOGLE",

        recyclerType: "GOOGLE",
    }));
};