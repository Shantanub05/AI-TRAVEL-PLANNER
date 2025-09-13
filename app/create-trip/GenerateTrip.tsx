import { chatSession } from '@/configs/AiModel'
import { auth, db } from '@/configs/FirebaseConfig'
import { Colors } from '@/constants/Colors'
import { AI_PROMPT } from '@/constants/Options'
import { CreateTripContext } from '@/context/CreateTripContext'
import { useNavigation, useRouter } from 'expo-router'
import { doc, setDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
const GenerateTrip = () => {
    const navigation = useNavigation()
    const { tripData, setTripData } = useContext(CreateTripContext)
    const [loading, setLoading] = useState(false)
    const user = auth.currentUser
    const router = useRouter()

    useEffect(() => {
        tripData && GenerateAiTrip()
},[tripData])

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })


    const GenerateAiTrip = async () => {
        setLoading(true)
        const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData.locationInfo.name)
            .replace('{totalDays}', String(tripData.totalDays))
            .replace('{totalNights}', String(tripData.totalDays - 1))
            .replace('{travelerType}', tripData.travelerCount.title)
            .replace('{budget}', tripData.budget)
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        // console.log(result.response.text());
        const tripRes = JSON.parse(result.response.text())
        setLoading(false)
        const docId = (Date.now().toString())
        await setDoc(doc(db, "UserTrips",docId ), {
            userEmail: user?.email,
            tripPlan: tripRes,
            tripData: tripData,
            docId: docId
        });
        router.push('/(tabs)/MyTrip')
      
    }
    
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Please Wait...</Text>
          <Text style={styles.text}>We are working to generate your dream trip</Text>
          <Image style={styles.gif} source={require('@/assets/images/riding-plane.gif')}/>
    </View>
  )
}
export default GenerateTrip


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
        marginBlock: 30,
        textAlign: 'center'
    },
    text: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
        marginTop: 20,
        marginBlock: 30,
        textAlign: 'center',
        color: Colors.gray
    },
    gif: {
        width: "100%",
        height: 300,
        borderRadius: 999
    }
})