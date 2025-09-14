import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getAttractionPhoto } from '../../services/GooglePlacesService'
import { useState, useEffect } from 'react'

const AttractionsList = ({ attractionsData, locationInfo }: any) => {
    const [attractionPhotos, setAttractionPhotos] = useState<{[key: string]: string}>({})

    console.log('Attractions:', attractionsData)
    console.log('Attraction photo references:', attractionsData?.map((attraction: any) => attraction.photo_reference))

    const openMaps = (latitude: number, longitude: number) => {
        const url = `https://maps.google.com/?q=${latitude},${longitude}`
        Linking.openURL(url)
    }

    // Fetch attraction photos from Google Places API
    useEffect(() => {
        const fetchPhotos = async () => {
            if (!attractionsData || !locationInfo?.name) return;

            const photos: {[key: string]: string} = {};

            for (const attraction of attractionsData) {
                try {
                    const photoUrl = await getAttractionPhoto(attraction.place_name, locationInfo.name);
                    if (photoUrl) {
                        photos[attraction.place_name] = photoUrl;
                    }
                } catch (error) {
                    console.error(`Error fetching photo for ${attraction.place_name}:`, error);
                }
            }

            setAttractionPhotos(photos);
        };

        fetchPhotos();
    }, [attractionsData, locationInfo])

    if (!attractionsData || attractionsData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>🎯 Attractions</Text>
                <Text style={styles.noData}>No attractions information available</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎯 Must-Visit Attractions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {attractionsData.map((attraction: any, index: number) => (
                    <View key={index} style={styles.attractionCard}>
                        <View style={styles.imageContainer}>
                            {attractionPhotos[attraction.place_name] ? (
                                <Image
                                    style={styles.attractionImage}
                                    source={{ uri: attractionPhotos[attraction.place_name] }}
                                    onError={(error) => {
                                        console.log('Attraction image failed to load:', error.nativeEvent.error)
                                    }}
                                />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Ionicons name="camera" size={40} color={Colors.primary + '60'} />
                                    <Text style={[styles.placeholderText, {textAlign: 'center'}]} numberOfLines={2}>
                                        {attraction.place_name}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.attractionInfo}>
                            <Text style={styles.attractionName}>{attraction.place_name}</Text>

                            <Text style={styles.description} numberOfLines={4}>
                                {attraction.description}
                            </Text>

                            <View style={styles.infoRow}>
                                <Ionicons name="ticket" size={16} color={Colors.primary} />
                                <Text style={styles.pricing}>
                                    {attraction.ticket_pricing_information}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Ionicons name="time" size={16} color={Colors.primary} />
                                <Text style={styles.bestTime} numberOfLines={2}>
                                    {attraction.best_time_to_visit}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.locationButton}
                                onPress={() => openMaps(
                                    attraction.geo_coordinates.latitude,
                                    attraction.geo_coordinates.longitude
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

export default AttractionsList

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
    attractionCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginRight: 15,
        marginLeft: 15,
        width: 300,
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
        height: 160,
        overflow: 'hidden',
    },
    attractionImage: {
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
    attractionInfo: {
        padding: 15,
    },
    attractionName: {
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
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    pricing: {
        fontFamily: 'outfit-medium',
        fontSize: 12,
        color: Colors.gray,
        marginLeft: 8,
        flex: 1,
    },
    bestTime: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        marginLeft: 8,
        flex: 1,
        lineHeight: 16,
    },
    locationButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
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