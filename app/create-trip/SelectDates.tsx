import { Colors } from '@/constants/Colors'
import { Link, useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from 'moment';
import { CreateTripContext } from '@/context/CreateTripContext';

const SelectDates = () => {
    const navigation = useNavigation()
    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)
    const { tripData, setTripData } = useContext(CreateTripContext)
    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    })

    const onDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
        if (type === 'START_DATE') {
            setStartDate(moment(date))
        }
        if (type === 'END_DATE') {
            setEndDate(moment(date))
        }
    };

    const onDateSelect = () => {
        if (!startDate && !endDate) {
            ToastAndroid.show('Please select start and end date', ToastAndroid.BOTTOM)
            return
        }
        const totalDays = startDate && endDate ? endDate.diff(startDate, 'days') : 0
        setTripData({ ...tripData, startDate: startDate?.format('YYYY-MM-DD'), endDate: endDate?.format('YYYY-MM-DD'), totalDays: totalDays + 1 })
        router.push('/create-trip/SelectBudget')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Travel Dates</Text>
            <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} minDate={new Date()} />
            <TouchableOpacity style={styles.button} onPress={onDateSelect}>
                    <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SelectDates
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: "100%",
        padding: 25,
        paddingTop: 75,
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20,
        marginBlock: 30
    },
    button: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        marginTop: 50,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
    },
})