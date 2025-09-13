import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
const StartNewTripCard = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={styles.textPrimary}>No Trips Planned Yet</Text>
      <Text style={styles.textSecondary}>Looks like its time to plan a new travel experience! Get Started below</Text>
      <TouchableOpacity
        onPress={() => { router.push('/create-trip/SearchPlace')}}
        style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}
export default StartNewTripCard
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  textPrimary: {
    fontFamily: 'outfit-medium',
    fontSize: 25,
  },
  textSecondary: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.gray,

  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    marginTop: "25%",
    paddingHorizontal: 30

  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17,
  }
})