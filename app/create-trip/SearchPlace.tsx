import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { CreateTripContext } from '@/context/CreateTripContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const trendingPlaces = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    rating: 4.8,
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    rating: 4.9,
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
    rating: 4.7,
    photoRef: 'CmRaAAAA...'
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    rating: 4.6,
    photoRef: 'CmRaAAAA...'
  }
]

const SearchPlace = () => {
  const navigation = useNavigation()
  const { tripData, setTripData } = useContext(CreateTripContext)
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Search',
      headerTransparent: true,

    })
  })

  useEffect(() => {
    // console.log("***************************")
    // console.log(tripData)
  },[tripData])

  const handleTrendingPlacePress = (place: any) => {
    setTripData({
      locationInfo: {
        name: place.name,
        photoRef: place.photoRef,
        url: place.image
      }
    })
    router.push('/create-trip/SelectTraveler')
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      
        <GooglePlacesAutocomplete
        placeholder='Search Places'
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 25,
          }
        }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: (details as any)?.photos?.[0]?.photo_reference,
                url: details?.url


              }
            })
            router.push('/create-trip/SelectTraveler')
            // console.log(data, details);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
        />

        {/* Trending Places Section */}
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeader}>
            <Text style={styles.trendingTitle}>✈️ Trending Now</Text>
            <Text style={styles.trendingSubtitle}>Popular destinations</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingScrollContainer}
          >
            {trendingPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.trendingCard}
                onPress={() => handleTrendingPlacePress(place)}
              >
                <Image
                  source={{ uri: place.image }}
                  style={styles.trendingImage}
                  resizeMode="cover"
                />
                <View style={styles.trendingOverlay}>
                  <Text style={styles.trendingPlaceName}>{place.name}</Text>
                  <View style={styles.trendingRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.trendingRatingText}>{place.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

  )
}
export default SearchPlace
const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.white,
    flex: 1,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 25,
  },
  trendingSection: {
    marginTop: 30,
  },
  trendingHeader: {
    marginBottom: 15,
  },
  trendingTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#2d3436',
    marginBottom: 5,
  },
  trendingSubtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.gray,
  },
  trendingScrollContainer: {
    paddingRight: 20,
  },
  trendingCard: {
    width: 160,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
  },
  trendingPlaceName: {
    fontFamily: 'outfit-bold',
    fontSize: 13,
    color: Colors.white,
    marginBottom: 4,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingRatingText: {
    fontFamily: 'outfit-bold',
    fontSize: 11,
    color: Colors.white,
    marginLeft: 4,
  },
})