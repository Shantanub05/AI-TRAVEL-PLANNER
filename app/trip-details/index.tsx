import FlightInfo from '@/components/TripDetails/FlightInfo';
import HotelList from '@/components/TripDetails/HotelList';
import AttractionsList from '@/components/TripDetails/AttractionsList';
import ItineraryPlan from '@/components/TripDetails/ItineraryPlan';
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import moment from 'moment';
import { useEffect } from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'

const TripDetails = () => {
    const navigation = useNavigation();
    const { trips } = useLocalSearchParams<{ trips?: string }>();


    let tripObj: any;
    if (typeof trips === 'string') {
        const decodedTrips = decodeURIComponent(trips);
        try {
            tripObj = JSON.parse(decodedTrips);
        } catch (error) {
            console.error("JSON parse error:", error);
            tripObj = {};
        }
    } else {
        tripObj = trips;
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
            headerShown: true
        });
    }, []);

    return (
        <ScrollView style={styles.mainContainer} nestedScrollEnabled={false}>
            {tripObj?.tripData?.locationInfo?.photoRef ? (
                (() => {
                    const photoUrl =
                        'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' +
                        tripObj.tripData.locationInfo.photoRef +
                        '&maxwidth=400&key=' +
                        (process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY as string);
                    console.log('Photo URL:', photoUrl);
                    return <Image style={styles.image} source={{ uri: photoUrl }} />;
                })()
            ) : (
                <Image source={require('@/assets/images/login.png')} style={styles.image} />
            )}

            <View style={styles.container}>
                <Text style={styles.name}>{tripObj.tripData.locationInfo.name}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{moment(tripObj?.tripData.startDate).format('DD MMM yyyy')}</Text>
                    <Text style={styles.tilde}>~</Text>
                    <Text style={styles.date}>{moment(tripObj?.tripData.endDate).format('DD MMM yyyy')}</Text>
                </View>
                <Text style={styles.count}>🚌 {tripObj.tripData.travelerCount.title}</Text>

                {/* Flight Information */}
                <FlightInfo flightData={tripObj.tripPlan.travel_plan.flights} />

                {/* Hotel List */}
                <HotelList
                    hotelData={tripObj.tripPlan.travel_plan.hotels}
                    locationInfo={tripObj.tripData.locationInfo}
                />

                {/* Attractions List */}
                <AttractionsList
                    attractionsData={tripObj.tripPlan.travel_plan.attractions}
                    locationInfo={tripObj.tripData.locationInfo}
                />

                {/* Daily Itinerary */}
                <ItineraryPlan itineraryData={tripObj.tripPlan.travel_plan.itinerary} />
            </View>
        </ScrollView>
    );
};

export default TripDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    image: {
        width: "100%",
        height: 330,
    },
    container: {
        backgroundColor: Colors.white,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        paddingLeft: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 100,
        height: "100%",
    },
    name: {
        padding: 15,
        backgroundColor: Colors.white,
        fontFamily: 'outfit-bold',
        fontSize: 25,
    },
    date: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color: Colors.gray
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15
    },
    tilde: {
        marginLeft: 5,
        marginRight: 5,
        color: Colors.gray
    },
    count: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.gray,
        paddingLeft: 15,
        marginTop: 10
    },
});