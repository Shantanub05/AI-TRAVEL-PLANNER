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
    const [hasGenerated, setHasGenerated] = useState(false)
    const user = auth.currentUser
    const router = useRouter()

    useEffect(() => {
        // Only generate trip once when component mounts and tripData exists
        if (tripData && !hasGenerated && !loading) {
            console.log('🎯 Triggering trip generation...')
            setHasGenerated(true)
            GenerateAiTrip()
        }
    }, [tripData, hasGenerated, loading])

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })


    const GenerateAiTrip = async () => {
        try {
            setLoading(true)
            console.log('🚀 Starting AI trip generation...')
            console.log('👤 Current User:', user)
            console.log('🔐 User authenticated:', !!user)
            console.log('📊 Trip Data:', tripData)

            // Validate required trip data
            if (!tripData?.locationInfo?.name) {
                throw new Error('Location information is missing')
            }
            if (!tripData?.totalDays) {
                throw new Error('Trip duration is missing')
            }
            if (!tripData?.travelerCount?.title) {
                throw new Error('Traveler count information is missing')
            }
            if (!tripData?.budget) {
                throw new Error('Budget information is missing')
            }

            console.log('✅ Trip data validation passed')

            const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData.locationInfo.name)
                .replace('{totalDays}', String(tripData.totalDays))
                .replace('{totalNights}', String(tripData.totalDays - 1))
                .replace('{travelerType}', tripData.travelerCount.title)
                .replace('{budget}', tripData.budget)

            console.log('📝 Generated Prompt:', FINAL_PROMPT.substring(0, 200) + '...')
            console.log('🔄 Sending request to Gemini API...')

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log('✅ Gemini API Response received')
            console.log('📄 Raw Response:', result.response.text());

            const tripRes = JSON.parse(result.response.text())
            console.log('✅ JSON parsed successfully')

            const docId = (Date.now().toString())

            console.log('💾 Saving trip to Firestore...')
            console.log('📧 User Email:', user?.email)
            console.log('🆔 Document ID:', docId)

            // Add timeout to Firestore operation
            const firestorePromise = setDoc(doc(db, "UserTrips", docId), {
                userEmail: user?.email,
                tripPlan: tripRes,
                tripData: tripData,
                docId: docId
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore operation timeout')), 30000)
            );

            await Promise.race([firestorePromise, timeoutPromise]);

            console.log('✅ Trip saved successfully to Firestore')
            console.log('🏠 Navigating to MyTrip screen...')
            router.push('/(tabs)/MyTrip')

        } catch (error) {
            console.error('❌ Error in AI trip generation:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))

            // Show user-friendly error message
            if (error.code === 'permission-denied') {
                console.error('🔒 Firestore permission denied. Please check security rules.')
                alert('Unable to save trip. Please check your permissions and try again.')
            } else if (error.message === 'Firestore operation timeout') {
                console.error('⏰ Firestore operation timed out')
                alert('Save operation timed out. Please check your internet connection.')
            } else if (error.message?.includes('missing')) {
                console.error('📝 Trip data validation failed:', error.message)
                alert(`Trip information incomplete: ${error.message}. Please go back and complete all steps.`)
            } else {
                console.error('🚫 Unknown error occurred')
                alert('An error occurred while generating your trip. Please try again.')
            }
        } finally {
            setLoading(false)
        }
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