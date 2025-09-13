import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
const Login = () => {

    const router = useRouter()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })      
    })

    return (
        <View>
            <Image source={require('./../assets/images/login.png')}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    AI Travel Planner
                </Text>
                <Text style={styles.textDescription}>Discover your next adventure effortlessly.
                    Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.</Text>
                <TouchableOpacity
                    onPress={()=>router.push('/auth/sign-in')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: -30,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 100,
        gap: 20,
    },
    image: {
        width: "100%",
        height: 400,
    },
    textTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 28,
        textAlign: 'center',
    },
    textDescription: {
        fontFamily: 'outfit',
        fontSize: 17,
        textAlign: 'center',
        color: Colors.gray,
        marginTop: 25,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        marginTop: "25%",

    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 17,
    }
})

