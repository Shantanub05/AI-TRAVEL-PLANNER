import { Colors } from '@/constants/Colors'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/configs/FirebaseConfig';
import UserTripCard from '@/components/MyTrips/UserTripCard';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Image, TouchableOpacity } from 'react-native';
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
        setUserTrips([]) // Clear existing trips to prevent duplicates

        const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);

        const trips: DocumentData[] = []
        querySnapshot.forEach((doc) => {
            trips.push(doc.data())
        });

        // Sort trips by docId (timestamp) in descending order - latest first
        const sortedTrips = trips.sort((a, b) => parseInt(b.docId) - parseInt(a.docId))
        console.log('📅 Sorted trips:', sortedTrips.map(trip => ({
            location: trip.tripData?.locationInfo?.name,
            docId: trip.docId
        })))

        setUserTrips(sortedTrips)
        setLoading(false)
    }
    const renderHeader = () => {
        const LatestTrip = userTrips[0]?.tripData;

        return (
            <View>
                <View style={styles.innerContainer}>
                    <Text style={styles.titleText}>MyTrip</Text>
                    <Ionicons name="add-circle" size={50} color="black" onPress={() => { router.push('/create-trip/SearchPlace') }} />
                </View>

                {loading && <ActivityIndicator size={'large'} color={Colors.primary} />}

                {userTrips?.length === 0 ? (
                    <StartNewTripCard />
                ) : LatestTrip ? (
                    <View style={styles.latestTripContainer}>
                        {LatestTrip.locationInfo.photoRef ? (
                            (() => {
                                const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?photo_reference='
                                    + LatestTrip.locationInfo.photoRef
                                    + '&maxwidth=400&key='
                                    + process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
                                return <Image style={styles.latestTripImage} source={{ uri: photoUrl }} />
                            })()
                        ) : (
                            <Image source={require('@/assets/images/login.png')} style={styles.latestTripImage} />
                        )}
                        <View style={styles.latestTripInfo}>
                            <Text style={styles.latestTripLocation}>
                                {LatestTrip.locationInfo.name}
                            </Text>
                            <View style={styles.latestTripDetails}>
                                <Text style={styles.latestTripDate}>{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
                                <Text style={styles.latestTripCount}>🚌 {LatestTrip.travelerCount.title}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.latestTripButton}
                                onPress={() => router.push({
                                    pathname: '/trip-details',
                                    params: { trips: encodeURIComponent(JSON.stringify(userTrips[0])) }
                                })}
                            >
                                <Text style={styles.latestTripButtonText}>See your plan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    };

    if (userTrips?.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.titleText}>MyTrip</Text>
                    <Ionicons name="add-circle" size={50} color="black" onPress={() => { router.push('/create-trip/SearchPlace') }} />
                </View>
                {loading && <ActivityIndicator size={'large'} color={Colors.primary} />}
                <StartNewTripCard />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {renderHeader()}
            {userTrips.map((trip) => (
                <UserTripCard key={trip.docId} userTrip={trip} />
            ))}
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
    },
    latestTripContainer: {
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    latestTripImage: {
        width: '100%',
        height: 240,
        borderRadius: 15,
    },
    latestTripInfo: {
        marginTop: 10,
    },
    latestTripLocation: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
    latestTripDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    latestTripDate: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.gray,
    },
    latestTripCount: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.gray,
    },
    latestTripButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 15,
        marginTop: 10,
    },
    latestTripButtonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 15,
    }
})