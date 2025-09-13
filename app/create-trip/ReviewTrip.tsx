import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '@/context/CreateTripContext';
import moment from 'moment';

const ReviewTrip = () => {
    const navigation = useNavigation()
    const { tripData, setTripData } = useContext(CreateTripContext)
    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
        })
    },[])
  return (
      <View style={styles.container}>
          {/* Destination Info */}
          <Text style={styles.title}>Review Your Trip</Text>
          <View>
              <Text style={styles.secondaryTitle}>Before generationg your trip , please review your selection</Text>
              <View style={styles.innerContainer}>
                  <Text style={styles.emoji}>📍</Text>
                  <View>
                      <Text style={styles.heading}>
                          Destination
                      </Text>
                      <Text style={styles.text}>
                          {tripData.locationInfo.name}
                      </Text>
                  </View>
              </View>
          </View>
          {/* Date Info */}
          <View style={styles.innerContainer}>
              <Text style={styles.emoji}>📅</Text>
              <View>
                  <Text style={styles.heading}>
                      Travel Date
                  </Text>
                  <Text style={styles.text}>
                      {moment(tripData.startDate).format('DD MMM') + " To " + moment(tripData.endDate).format('DD MMM YYYY')}
                  </Text>
                  <Text style={styles.text}>{tripData.totalDays} Days</Text>
              </View>
          </View>
              {/* Travelers Info */}
              <View style={styles.innerContainer}>
              <Text style={styles.emoji}>🚌</Text>
                  <View>
                      <Text style={styles.heading}>
                          Who is Traveling?
                      </Text>
                      <Text style={styles.text}>
                      {tripData.travelerCount.title}
                      </Text>
                  </View>
          </View>     
          {/* Budget Info */}
          <View style={styles.innerContainer}>
              <Text style={styles.emoji}>💰</Text>
              <View>
                  <Text style={styles.heading}>
                      Budget
                  </Text>
                  <Text style={styles.text}>
                      {tripData.budget}
                  </Text>
              </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>router.replace('/create-trip/GenerateTrip')}>
                          <Text style={styles.buttonText}>Build My Trip</Text>
                      </TouchableOpacity>
    </View>
  )
}
export default ReviewTrip

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: "100%",
        padding: 25,
        paddingTop: 50,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20,
        marginBlock: 30
    },
    secondaryTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: Colors.gray,
        marginBottom: 20
    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
        paddingRight: 30
    },
    innerContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
    },
    emoji: {
        fontSize: 30,
    },
    button: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        marginTop: 80
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
    
})