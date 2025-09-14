import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const FlightInfo = ({ flightData }: any) => {
    console.log(flightData)

    const openBookingLink = (url: string) => {
        Linking.openURL(url)
    }

    if (!flightData || flightData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>✈️ Flights</Text>
                <Text style={styles.noData}>No flight information available</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>✈️ Flight Details</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {flightData.map((flight: any, index: number) => (
                    <View key={index} style={styles.flightCard}>
                        <Text style={styles.airline}>{flight.airline}</Text>
                        <Text style={styles.flightNumber}>{flight.flight_number}</Text>

                        <View style={styles.timeContainer}>
                            <Text style={styles.time}>{flight.departure_time}</Text>
                            <Ionicons name="airplane" size={20} color={Colors.primary} />
                            <Text style={styles.time}>{flight.arrival_time}</Text>
                        </View>

                        <Text style={styles.price}>${flight.price} {flight.currency}</Text>

                        {flight.notes && (
                            <Text style={styles.notes}>{flight.notes}</Text>
                        )}

                        <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => openBookingLink(flight.booking_url)}
                        >
                            <Text style={styles.bookButtonText}>Book Flight</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default FlightInfo

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 15,
        paddingLeft: 15,
    },
    flightCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        marginRight: 15,
        marginLeft: 15,
        minWidth: 250,
        borderWidth: 1,
        borderColor: Colors.gray + '30',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    airline: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: Colors.primary,
    },
    flightNumber: {
        fontFamily: 'outfit-medium',
        fontSize: 14,
        color: Colors.gray,
        marginTop: 2,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    time: {
        fontFamily: 'outfit-medium',
        fontSize: 16,
        color: Colors.gray,
    },
    price: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    notes: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        textAlign: 'center',
        marginBottom: 10,
    },
    bookButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.white,
        fontFamily: 'outfit-medium',
        fontSize: 14,
    },
    noData: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        paddingLeft: 15,
    }
})