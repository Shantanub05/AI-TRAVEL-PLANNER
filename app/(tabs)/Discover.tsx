import { Colors } from '@/constants/Colors'
import { CreateTripContext } from '@/context/CreateTripContext'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const trendingPlaces = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with stunning beaches, temples, and vibrant culture',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    rating: 4.8,
    bestTime: 'Apr - Oct',
    photoRef: 'CmRaAAAA...' // Would be actual Google Places photo ref
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    description: 'Modern metropolis blending traditional culture with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    rating: 4.9,
    bestTime: 'Mar - May, Oct - Nov',
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    description: 'Iconic white-washed buildings overlooking the deep blue Aegean Sea',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
    rating: 4.7,
    bestTime: 'May - Oct',
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    description: 'Luxury destination with towering skyscrapers, pristine beaches, and world-class shopping',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    rating: 4.6,
    bestTime: 'Nov - Apr',
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 5,
    name: 'Maldives',
    description: 'Tropical island nation famous for crystal-clear waters and overwater bungalows',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    rating: 4.9,
    bestTime: 'Nov - Apr',
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 6,
    name: 'Paris, France',
    description: 'City of lights renowned for art, fashion, gastronomy, and culture',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&q=80&auto=format',
    rating: 4.5,
    bestTime: 'Apr - Jun, Sep - Oct',
    photoRef: 'CmRaAAAA...'
  }
]

const Discover = () => {
  const router = useRouter()
  const { setTripData } = useContext(CreateTripContext)

  const handlePlacePress = (place: any) => {
    // Pre-populate the trip context with selected destination
    setTripData({
      locationInfo: {
        name: place.name,
        photoRef: place.photoRef,
        url: place.image
      }
    })

    // Navigate to the date selection step
    router.push('/create-trip/SelectDates')
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Popular destinations waiting for you</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>✈️ Trending Now</Text>
        <Text style={styles.sectionSubtitle}>Handpicked destinations</Text>
      </View>

      <View style={styles.placesGrid}>
        {trendingPlaces.slice(0, 2).map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.largePlaceCard}
            onPress={() => handlePlacePress(place)}
          >
            <Image
              source={{ uri: place.image }}
              style={styles.largePlaceImage}
              resizeMode="cover"
            />
            <View style={styles.largePlaceOverlay}>
              <View style={styles.largePlaceInfo}>
                <Text style={styles.largePlaceName}>{place.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{place.rating}</Text>
                  <Text style={styles.bestTimeText}>• {place.bestTime}</Text>
                </View>
              </View>
              <View style={styles.exploreButton}>
                <Ionicons name="arrow-forward" size={18} color={Colors.white} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.smallCardsRow}>
          {trendingPlaces.slice(2, 4).map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.smallPlaceCard}
              onPress={() => handlePlacePress(place)}
            >
              <Image
                source={{ uri: place.image }}
                style={styles.smallPlaceImage}
                resizeMode="cover"
              />
              <View style={styles.smallPlaceOverlay}>
                <Text style={styles.smallPlaceName}>{place.name}</Text>
                <View style={styles.smallRatingRow}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.smallRatingText}>{place.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {trendingPlaces.slice(4, 6).map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.mediumPlaceCard}
            onPress={() => handlePlacePress(place)}
          >
            <Image
              source={{ uri: place.image }}
              style={styles.mediumPlaceImage}
              resizeMode="cover"
            />
            <View style={styles.mediumPlaceOverlay}>
              <View style={styles.mediumPlaceInfo}>
                <Text style={styles.mediumPlaceName}>{place.name}</Text>
                <Text style={styles.mediumPlaceDesc} numberOfLines={1}>
                  {place.description}
                </Text>
                <View style={styles.mediumRatingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.mediumRatingText}>{place.rating}</Text>
                  <Text style={styles.mediumTimeText}>• {place.bestTime}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.customTripButton}
          onPress={() => router.push('/create-trip/SearchPlace')}
        >
          <View style={styles.customTripIcon}>
            <Ionicons name="add" size={24} color={Colors.primary} />
          </View>
          <View style={styles.customTripTextContainer}>
            <Text style={styles.customTripTitle}>Create Custom Trip</Text>
            <Text style={styles.customTripSubtitle}>Choose your own destination</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Discover

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: Colors.gray,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#2d3436',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.gray,
  },
  placesGrid: {
    paddingHorizontal: 15,
    gap: 15,
  },
  // Large cards (first 2)
  largePlaceCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 5,
  },
  largePlaceImage: {
    width: '100%',
    height: '100%',
  },
  largePlaceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  largePlaceInfo: {
    flex: 1,
  },
  largePlaceName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: Colors.white,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'outfit-bold',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 5,
  },
  bestTimeText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 8,
    opacity: 0.9,
  },
  exploreButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  // Small cards row (middle 2)
  smallCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  smallPlaceCard: {
    flex: 1,
    height: 140,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  smallPlaceImage: {
    width: '100%',
    height: '100%',
  },
  smallPlaceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
  },
  smallPlaceName: {
    fontFamily: 'outfit-bold',
    fontSize: 14,
    color: Colors.white,
    marginBottom: 5,
  },
  smallRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallRatingText: {
    fontFamily: 'outfit-bold',
    fontSize: 12,
    color: Colors.white,
    marginLeft: 4,
  },
  // Medium cards (last 2)
  mediumPlaceCard: {
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    marginHorizontal: 5,
  },
  mediumPlaceImage: {
    width: '100%',
    height: '100%',
  },
  mediumPlaceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  mediumPlaceInfo: {
    flex: 1,
  },
  mediumPlaceName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: Colors.white,
    marginBottom: 4,
  },
  mediumPlaceDesc: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  mediumRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediumRatingText: {
    fontFamily: 'outfit-bold',
    fontSize: 12,
    color: Colors.white,
    marginLeft: 4,
  },
  mediumTimeText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 10,
  },
  customTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  customTripIcon: {
    backgroundColor: Colors.primary + '15',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  customTripTextContainer: {
    flex: 1,
  },
  customTripTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 2,
  },
  customTripSubtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.gray,
  },
})