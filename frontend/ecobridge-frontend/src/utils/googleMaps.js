let googleMapsPromise = null;

export const loadGoogleMaps = () => {
    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        if (window.google?.maps) {
            resolve(window.google.maps);
            return;
        }

        const existingScript = document.querySelector(
            'script[data-google-maps="true"]'
        );

        if (existingScript) {
            existingScript.addEventListener("load", () =>
                resolve(window.google.maps)
            );

            existingScript.addEventListener("error", reject);
            return;
        }

        const script = document.createElement("script");

        script.src =
            `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&loading=async`;

        script.async = true;
        script.defer = true;
        script.dataset.googleMaps = "true";

        script.onload = () => resolve(window.google.maps);
        script.onerror = reject;

        document.head.appendChild(script);
    });

    return googleMapsPromise;
};