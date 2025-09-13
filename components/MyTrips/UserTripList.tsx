import { Colors } from '@/constants/Colors'
import moment from 'moment'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import UserTripCard from './UserTripCard'
import { useRouter } from 'expo-router'

const UserTripList = ({ userTrips }: any) => {
    const LatestTrip = userTrips[0].tripData
    console.log(userTrips)
    const router = useRouter()

    return (
        <ScrollView style={styles.innerContainer}>
            {LatestTrip.locationInfo.photoRef
                ? (
                    (() => {
                        const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?photo_reference='
                            + LatestTrip.locationInfo.photoRef
                            + '&maxwidth=400&key='
                            + process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
                        // console.log('Photo URL:', photoUrl);
                        return <Image style={styles.image} source={{ uri: photoUrl }} />
                    })()
                )
                : (
                    <Image source={require('@/assets/images/login.png')} style={styles.image} />
                )
            }
            <View style={styles.locationContainer}>
                <Text style={styles.location}>
                    {userTrips[0].tripData.locationInfo.name}
                </Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.date}>{moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
                    <Text style={styles.count}>🚌 {LatestTrip.travelerCount.title}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: { trips: encodeURIComponent(JSON.stringify(userTrips[0])) } // encode the JSON string
                    })}
                >
                    <Text style={styles.buttonText}>See your plan</Text>
                </TouchableOpacity>
            </View>
            {userTrips.map((trip: any, index: number) => (
                <UserTripCard userTrip={trip} key={index} />
            ))}

        </ScrollView>
    )
}
export default UserTripList
const styles = StyleSheet.create({
    innerContainer: {
        marginTop: 20,
        paddingBottom: 100
    },
    image: {
        width: '100%',
        height: 240,
        objectFit: 'cover',
        borderRadius: 15,
    },
    location: {
        fontFamily: 'outfit-medium',
        fontSize: 20
    },
    locationContainer: {
        marginTop: 10
    },
    date: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.gray
    },
    count: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.gray
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 15,
        marginTop: 10
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 15
    },
})