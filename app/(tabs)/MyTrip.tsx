import { Colors } from '@/constants/Colors'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/configs/FirebaseConfig';
import UserTripList from '@/components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
const MyTrip = () => {

    const [userTrips, setUserTrips] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const user = auth.currentUser;

    useEffect(() => {
        user && getMyTrips()
    }, [user])

    const getMyTrips = async () => {
        setLoading(true)
        const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setUserTrips(prev=>[...prev,doc.data()])
        });
        setLoading(false)
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>MyTrip</Text>
                <Ionicons name="add-circle" size={50} color="black" onPress={() => { router.push('/create-trip/SearchPlace') }} />
            </View>
            {loading && <ActivityIndicator size={'large'} color={Colors.primary} />}
            {userTrips?.length == 0 ? <StartNewTripCard /> : 
                <UserTripList userTrips={ userTrips} />
            }
        </ScrollView>
    )
}
export default MyTrip

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.white,
        height: "100%",
    },
    innerContainer: {
        display: "flex",
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'outfit-bold',
        fontSize: 35,

    }
})