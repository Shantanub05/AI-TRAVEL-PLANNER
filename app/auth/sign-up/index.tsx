import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '@/configs/FirebaseConfig';


const SignUp = () => {

    const navigation = useNavigation()
    const router = useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const onCreateAccount = () => {
        if (!email && !password && !fullName) {
            ToastAndroid.show('Please Enter all details',ToastAndroid.BOTTOM)
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      router.replace('/MyTrip')
    //   console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage,errorCode)
    // ..
  });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>router.back()}><Ionicons name="arrow-back-outline" size={24} color="black" /></TouchableOpacity>
            <Text style={styles.textTitlePrimary}>Create New Account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Full Name</Text>
                <TextInput style={styles.textInput} placeholder='Enter Full Name' onChangeText={(value)=>setFullName(value)} />
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.textInput} placeholder='Enter Email'  onChangeText={(value)=>setEmail(value)}  />
                <Text style={styles.text}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.textInput} placeholder='Enter Password'  onChangeText={(value) => setPassword(value)} />
            </View>
            <TouchableOpacity
                onPress={onCreateAccount}
                style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push('/auth/sign-in')}
                style={styles.buttonLight}>
                <Text style={styles.buttonTextLight}>Sign In</Text>
            </TouchableOpacity>
            

        </View>
    )
}
export default SignUp
const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 50,
        gap: 20,
        backgroundColor: Colors.white,
        height: "100%",
    },
    textTitlePrimary: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
    },
    inputContainer: {
        marginTop: 50,
        gap: 10,
        marginBottom: 20,
    },
    text: {
        fontFamily: 'outfit',
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.gray,
        fontFamily: 'outfit',
    },
    button: {
        padding: 20,
        borderRadius: 99,
        backgroundColor: Colors.primary,
    },
    buttonLight: {
        padding: 20,
        borderRadius: 99,
        borderWidth: 1,
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
    },
    buttonTextLight: {
        textAlign: 'center',
    }
})