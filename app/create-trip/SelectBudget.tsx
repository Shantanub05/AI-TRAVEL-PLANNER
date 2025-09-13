import OptionCard from '@/components/CreateTrip/OptionCard'
import { Colors } from '@/constants/Colors'
import { SelectBudgetOptions } from '@/constants/Options'
import { CreateTripContext } from '@/context/CreateTripContext'
import {  useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'


export interface TravelerBudget {
    id: number;
    title: string;
    desc: string;
    icon: string;
}

const SelectBudget = () => {
    const navigation = useNavigation()
    const [selectBudget, setSelectBudget] = useState<TravelerBudget>()
    const { tripData, setTripData } = useContext(CreateTripContext)
    const router = useRouter()

    const onclickContinue = () => {
        if (!selectBudget) {
            ToastAndroid.show('Please select a budget', ToastAndroid.BOTTOM)
            return
        }
        router.push('/create-trip/ReviewTrip')
    }


    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
        })
    }, [])

    useEffect(() => {
        selectBudget && setTripData({
            ...tripData,
            budget: selectBudget?.title
        })
    }, [selectBudget])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SelectBudget</Text>
            <View>
                <Text style={styles.secondaryTitle}>Choose spending habit for your trip</Text>
                <FlatList data={SelectBudgetOptions} renderItem={({ item, index }) =>
                    <TouchableOpacity style={styles.card} onPress={() => setSelectBudget(item)}>
                        <OptionCard option={item} selectOption={selectBudget} />
                    </TouchableOpacity>
                } />
            </View>
            <TouchableOpacity style={styles.button} onPress={onclickContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SelectBudget
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
        marginBlock: 30
    },
    secondaryTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: Colors.gray
    },
    card: {
        marginVertical: 10
    },
    button: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        marginTop: 20
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 15,
    },
})