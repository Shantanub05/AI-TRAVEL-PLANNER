import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
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
    console.log('🎬 SearchPlace component mounted');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <GooglePlacesAutocomplete
          placeholder='Search Places'
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('🔍 Search result clicked:', data.description);
            console.log('📍 Details received:', details ? 'Yes' : 'No');
            console.log('🗂️ Full details:', details);

            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: (details as any)?.photos?.[0]?.photo_reference,
                url: details?.url
              }
            })

            console.log('🚀 Navigating to SelectTraveler...');
            router.push('/create-trip/SelectTraveler')
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 25,
              backgroundColor: 'white'
            },
            textInput: {
              height: 44,
              fontSize: 16,
              backgroundColor: 'white'
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
              marginTop: 5,
            },
            row: {
              backgroundColor: 'white',
              padding: 13,
              minHeight: 44,
            },
            separator: {
              height: 0.5,
              backgroundColor: '#ddd',
            },
            description: {
              fontSize: 15,
              color: '#333',
            },
            poweredContainer: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: '#c8c7cc',
              borderTopWidth: 0.5,
            },
          }}
          enablePoweredByContainer={false}
          debounce={200}
          minLength={2}
          returnKeyType={'search'}
          keyboardShouldPersistTaps='handled'
          listViewDisplayed='auto'
          textInputProps={{
            onFocus: () => console.log('🎯 Search input focused'),
            onBlur: () => console.log('🎯 Search input blurred'),
          }}
          onFail={(error) => {
            console.error('❌ GooglePlacesAutocomplete error:', error);
          }}
          onNotFound={() => {
            console.log('🔍 No results found');
          }}
          onTimeout={() => {
            console.log('⏰ Search request timed out');
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

      </KeyboardAvoidingView>

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