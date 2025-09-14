import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const ItineraryPlan = ({ itineraryData }: any) => {
    console.log('Itinerary:', itineraryData)

    if (!itineraryData) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>📅 Itinerary</Text>
                <Text style={styles.noData}>No itinerary information available</Text>
            </View>
        )
    }

    const getDayNumber = (dayKey: string) => {
        const match = dayKey.match(/day_(\d+)/)
        return match ? match[1] : '1'
    }

    const formatTime = (time: string) => {
        // Handle null or undefined time
        if (!time || typeof time !== 'string') {
            return 'Time TBD'
        }

        // Handle time that doesn't contain ':'
        if (!time.includes(':')) {
            return time
        }

        // Convert 24-hour format to 12-hour format
        const [hours, minutes] = time.split(':')
        const hour12 = parseInt(hours) % 12 || 12
        const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM'
        return `${hour12}:${minutes} ${ampm}`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📅 Day-by-Day Itinerary</Text>

            {Object.entries(itineraryData).map(([dayKey, dayData]: [string, any]) => (
                <View key={dayKey} style={styles.dayContainer}>
                    <Text style={styles.dayTitle}>
                        Day {getDayNumber(dayKey)}
                    </Text>

                    {dayData.activities && dayData.activities.map((activity: any, index: number) => (
                        <View key={index} style={styles.activityCard}>
                            <View style={styles.timeContainer}>
                                <View style={styles.timeIcon}>
                                    <Ionicons name="time" size={16} color={Colors.primary} />
                                </View>
                                <Text style={styles.activityTime}>
                                    {formatTime(activity.start_time)}
                                </Text>
                            </View>

                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>
                                    {activity.activity}
                                </Text>

                                {activity.estimated_travel_time && activity.estimated_travel_time !== 'None' && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="car" size={14} color={Colors.gray} />
                                        <Text style={styles.travelTime}>
                                            Travel: {activity.estimated_travel_time}
                                        </Text>
                                    </View>
                                )}

                                {activity.notes && (
                                    <View style={styles.infoRow}>
                                        <Ionicons name="information-circle" size={14} color={Colors.gray} />
                                        <Text style={styles.activityNotes}>
                                            {activity.notes}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default ItineraryPlan

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 15,
        paddingLeft: 15,
    },
    dayContainer: {
        marginBottom: 25,
        paddingHorizontal: 15,
    },
    dayTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: Colors.primary,
        marginBottom: 15,
        backgroundColor: Colors.primary + '20',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
    },
    activityCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
    },
    timeContainer: {
        backgroundColor: Colors.primary + '10',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeIcon: {
        marginRight: 8,
    },
    activityTime: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
        color: Colors.primary,
    },
    activityContent: {
        padding: 15,
    },
    activityTitle: {
        fontFamily: 'outfit-medium',
        fontSize: 15,
        color: '#333',
        marginBottom: 8,
        lineHeight: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 6,
    },
    travelTime: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        marginLeft: 6,
        fontStyle: 'italic',
    },
    activityNotes: {
        fontFamily: 'outfit',
        fontSize: 12,
        color: Colors.gray,
        marginLeft: 6,
        flex: 1,
        lineHeight: 16,
    },
    noData: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        paddingLeft: 15,
    }
})