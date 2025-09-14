/**
 * Utility functions for Google Places API integration
 */

/**
 * Builds a Google Places Photo URL from a photo reference
 * @param photoReference - The photo_reference from Google Places API
 * @param maxWidth - Maximum width of the image (default: 400)
 * @returns Complete Google Places photo URL
 */
export const buildGooglePlacesPhotoUrl = (photoReference: string, maxWidth: number = 400): string => {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!photoReference || !apiKey) {
        return '';
    }

    return `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=${maxWidth}&key=${apiKey}`;
};

/**
 * Checks if a photo reference is valid
 * @param photoReference - The photo_reference to validate
 * @returns boolean indicating if the reference is valid
 */
export const isValidPhotoReference = (photoReference: string): boolean => {
    return !!(
        photoReference &&
        typeof photoReference === 'string' &&
        photoReference.length > 10 && // Photo references are typically long strings
        !photoReference.includes('example.com') && // Exclude placeholder URLs
        !photoReference.startsWith('http') // Exclude regular URLs
    );
};

/**
 * Gets photo URL with fallback handling
 * @param photoReference - The photo_reference from API response
 * @param maxWidth - Maximum width of the image
 * @returns Photo URL or empty string if invalid
 */
export const getPhotoUrl = (photoReference: string, maxWidth: number = 400): string => {
    if (isValidPhotoReference(photoReference)) {
        return buildGooglePlacesPhotoUrl(photoReference, maxWidth);
    }
    return '';
};