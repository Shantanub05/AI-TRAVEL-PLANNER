import { Colors } from '@/constants/Colors'
import moment from 'moment'
import { Image, StyleSheet, Text, View } from 'react-native'

const UserTripCard = (
    { userTrip }: any
) => {
return (
    <View style={styles.container}>
        {userTrip.tripData.locationInfo.photoRef
                            ? (
                                (() => {
                                    const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?photo_reference='
                                        + userTrip.tripData.locationInfo.photoRef
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
        <View>
            <Text style={styles.location}>{userTrip?.tripData.locationInfo.name}</Text>
            <Text style={styles.date}>{moment(userTrip?.tripData.startDate).format('DD MMM yyyy')}</Text>
            <Text style={styles.count}>Traveling: {userTrip.tripData.travelerCount.title}</Text>
        </View>
        </View>
    )
}
export default UserTripCard
const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
       
    },
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    location: {
        fontFamily: 'outgit-medium',
        fontSize: 15,
    },
    date: {
        fontFamily: 'outgit-medium',
        fontSize: 14,
        color: Colors.gray
    },
    count: {
        fontFamily: 'outgit-medium',
        fontSize: 14,
        color: Colors.gray
    }
})