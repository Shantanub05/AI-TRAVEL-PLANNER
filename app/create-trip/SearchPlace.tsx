import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View } from 'react-native'
import { CreateTripContext } from '@/context/CreateTripContext';
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
  return (
    <View style={styles.container}>

      
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
      </View>
  
  )
}
export default SearchPlace
const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.white,
    height: "100%",
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 25,
  }
})