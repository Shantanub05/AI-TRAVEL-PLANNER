import { TravelerBudget } from '@/app/create-trip/SelectBudget';
import { TravelerOption } from '@/app/create-trip/SelectTraveler';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native'

 interface Traveler {
id: number,
title: string,
desc: string,
icon: string,
people: string,

}

interface OptionCardProps {
    option: Traveler | TravelerBudget
    selectOption: TravelerOption | TravelerBudget | undefined
}

const OptionCard = ({ option, selectOption }: OptionCardProps,) => {
    const isSelected = selectOption?.id === option.id;
    return (
        <View style={[styles.container, isSelected && styles.selected]}>
            <View>
                <View style={styles.innerContainer}>
                    <Text style={styles.titleText}>{option?.title}</Text>
                    <Text style={styles.icon}>{option?.icon}</Text>
               </View>
                <Text style={styles.desc}>{option?.desc}</Text>
            </View>
        </View>
    )
}
export default OptionCard
const styles = StyleSheet.create({
    container: {
        padding: 15,
        display: "flex",
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        backgroundColor: Colors.light_gray

    },
    innerContainer: {
        display: "flex",
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'outfit-bold'
    },
    desc: {
        fontSize: 17,
        fontFamily: 'outfit',
        color: Colors.gray,
    },
    icon: {
        fontSize: 25,
        paddingLeft: 20,
        
    },
    selected: {
        borderWidth: 2,
    }
})