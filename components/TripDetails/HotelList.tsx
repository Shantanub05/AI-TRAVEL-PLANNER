import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getHotelPhoto } from '../../services/GooglePlacesService'
import { useState, useEffect } from 'react'

const HotelList = ({ hotelData, locationInfo }: any) => {
    const [hotelPhotos, setHotelPhotos] = useState<{[key: string]: string}>({})

    console.log('Hotels:', hotelData)
    console.log('Hotel photo references:', hotelData?.map((hotel: any) => hotel.photo_reference))

    const openMaps = (latitude: number, longitude: number) => {
        const url = `https://maps.google.com/?q=${latitude},${longitude}`
        Linking.openURL(url)
    }

    // Fetch hotel photos from Google Places API
    useEffect(() => {
        const fetchPhotos = async () => {
            if (!hotelData || !locationInfo?.name) return;

            const photos: {[key: string]: string} = {};

            for (const hotel of hotelData) {
                try {
                    const photoUrl = await getHotelPhoto(hotel.hotel_name, locationInfo.name);
                    if (photoUrl) {
                        photos[hotel.hotel_name] = photoUrl;
                    }
                } catch (error) {
                    console.error(`Error fetching photo for ${hotel.hotel_name}:`, error);
                }
            }

            setHotelPhotos(photos);
        };

        fetchPhotos();
    }, [hotelData, locationInfo])

    if (!hotelData || hotelData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>🏨 Hotels</Text>
                <Text style={styles.noData}>No hotel information available</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏨 Hotel Recommendations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {hotelData.map((hotel: any, index: number) => (
                    <View key={index} style={styles.hotelCard}>
                        <View style={styles.imageContainer}>
                            {hotelPhotos[hotel.hotel_name] ? (
                                <Image
                                    style={styles.hotelImage}
                                    source={{ uri: hotelPhotos[hotel.hotel_name] }}
                                    onError={(error) => {
                                        console.log('Hotel image failed to load:', error.nativeEvent.error)
                                    }}
                                />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Ionicons name="bed" size={40} color={Colors.primary + '60'} />
                                    <Text style={styles.placeholderText}>{hotel.hotel_name}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.hotelInfo}>
                            <Text style={styles.hotelName}>{hotel.hotel_name}</Text>

                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.rating}>{hotel.rating}/5.0</Text>
                            </View>

                            <Text style={styles.address} numberOfLines={2}>
                                📍 {hotel.address}
                            </Text>

                            <Text style={styles.price}>
                                ${hotel.price_per_night} {hotel.currency}/night
                            </Text>

                            <Text style={styles.description} numberOfLines={3}>
                                {hotel.description}
                            </Text>

                            <TouchableOpacity
                                style={styles.locationButton}
                                onPress={() => openMaps(
                                    hotel.geo_coordinates.latitude,
                                    hotel.geo_coordinates.longitude
                                )}
                            >
                                <Ionicons name="location" size={16} color={Colors.white} />
                                <Text style={styles.locationButtonText}>View Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default HotelList

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 15,
        paddingLeft: 15,
    },
    hotelCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 15,
        width: 280,
        borderWidth: 1,
        borderColor: Colors.gray + '30',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 150,
        overflow: 'hidden',
    },
    hotelImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.gray + '20',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.primary + '60',
        marginTop: 5,
    },
    hotelInfo: {
        padding: 15,
    },
    hotelName: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color: Colors.gray,
        marginLeft: 5,
    },
    address: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        marginBottom: 8,
        lineHeight: 16,
    },
    price: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 8,
    },
    description: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        marginBottom: 12,
        lineHeight: 16,
    },
    locationButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationButtonText: {
        color: Colors.white,
        fontFamily: 'outfit-medium',
        fontSize: 12,
        marginLeft: 5,
    },
    noData: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        paddingLeft: 15,
    }
})