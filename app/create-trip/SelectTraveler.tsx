import OptionCard from '@/components/CreateTrip/OptionCard'
import { Colors } from '@/constants/Colors'
import { SelectTravelersList } from '@/constants/Options'
import { CreateTripContext } from '@/context/CreateTripContext'
import { Link, useNavigation, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface TravelerOption {
    id: number;
    title: string;
    desc: string;
    icon: string;
    people: string;
}

const SelectTraveler = () => {
    const navigation = useNavigation()
    const [selectTraveler, setSelectTraveler] = useState<TravelerOption>()
    const { tripData, setTripData } = useContext(CreateTripContext)
    
    useEffect(() => {
        setTripData({...tripData,travelerCount:selectTraveler})
    },[selectTraveler])
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,
        })
    })
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Who's Travelling</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.primaryText}>Choose your travelers</Text>
                <FlatList
                    data={SelectTravelersList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                        onPress={()=>setSelectTraveler(item)}    style={styles.card}>
                            <OptionCard
                                option={item}
                                selectOption={selectTraveler}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            
            <TouchableOpacity style={styles.button}>
                <Link href={'/create-trip/SelectDates'}>
                <Text style={styles.buttonText}>Continue</Text>
            </Link>
                </TouchableOpacity>
        </View>
    )
}
export default SelectTraveler
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: "100%",
        padding: 25,
        paddingTop: 75,
        
    },
    textTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20,
    },
    primaryText: {
        fontFamily: 'outfit-bold',
        fontSize: 23,
        marginBottom: 20,
    },
    innerContainer: {
        marginBottom: 20,
        marginTop: 20
    },
    card: {
        marginVertical:10
    },
    button: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 15,
    },
})