/**
 * Google Places API service for fetching real place data including photos
 */

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export interface PlacePhoto {
  photo_reference: string;
  width: number;
  height: number;
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  photos?: PlacePhoto[];
  rating?: number;
  formatted_address?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

/**
 * Search for a place using Google Places Text Search API
 */
export const searchPlace = async (
  query: string,
  location?: string
): Promise<PlaceDetails | null> => {
  try {
    const searchQuery = location ? `${query} in ${location}` : query;
    const url = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results?.length > 0) {
      return data.results[0]; // Return the first result
    }

    return null;
  } catch (error) {
    console.error('Error searching place:', error);
    return null;
  }
};

/**
 * Get place details including photos using Place ID
 */
export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
  try {
    const fields = 'name,photos,rating,formatted_address,geometry';
    const url = `${PLACES_API_BASE}/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      return data.result;
    }

    return null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

/**
 * Get photo URL from photo reference
 */
export const getPhotoUrl = (photoReference: string, maxWidth: number = 400): string => {
  if (!photoReference || !GOOGLE_PLACES_API_KEY) {
    return '';
  }

  return `${PLACES_API_BASE}/photo?photo_reference=${photoReference}&maxwidth=${maxWidth}&key=${GOOGLE_PLACES_API_KEY}`;
};

/**
 * Search for hotel photos by name and location
 */
export const getHotelPhoto = async (hotelName: string, location: string): Promise<string> => {
  try {
    const place = await searchPlace(`${hotelName} hotel`, location);
    if (place?.photos?.length > 0) {
      return getPhotoUrl(place.photos[0].photo_reference, 400);
    }
  } catch (error) {
    console.error('Error getting hotel photo:', error);
  }
  return '';
};

/**
 * Search for attraction photos by name and location
 */
export const getAttractionPhoto = async (attractionName: string, location: string): Promise<string> => {
  try {
    const place = await searchPlace(attractionName, location);
    if (place?.photos?.length > 0) {
      return getPhotoUrl(place.photos[0].photo_reference, 400);
    }
  } catch (error) {
    console.error('Error getting attraction photo:', error);
  }
  return '';
};

/**
 * Batch fetch photos for multiple places
 */
export const batchFetchPhotos = async (
  items: Array<{ name: string; type: 'hotel' | 'attraction' }>,
  location: string
): Promise<Array<{ name: string; photoUrl: string }>> => {
  const results = await Promise.allSettled(
    items.map(async (item) => {
      const photoUrl = item.type === 'hotel'
        ? await getHotelPhoto(item.name, location)
        : await getAttractionPhoto(item.name, location);

      return { name: item.name, photoUrl };
    })
  );

  return results.map((result, index) => ({
    name: items[index].name,
    photoUrl: result.status === 'fulfilled' ? result.value.photoUrl : ''
  }));
};