import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {

    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,


} from 'firebase/auth';
import { auth, provider } from '@/configs/FirebaseConfig';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AuthProvider, useAuth } from '@/configs/AuthContext';



// GoogleSignin.configure({
//     webClientId: "1056489445891-p69mdlhgngprardikmdpkh54s9vh2hf8.apps.googleusercontent.com",
    
// });



const SignIn = () => {
    const { googleSignIn } = useAuth();
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {
        if (!email || !password) {
            ToastAndroid.show('Please Enter all details', ToastAndroid.BOTTOM);
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/MyTrip')
                // console.log("Email sign in successful", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-credential') {
                    ToastAndroid.show("Invalid Credential", ToastAndroid.BOTTOM);
                }
            });
    };

   

    // Unified Google sign-in function:
    const signInWithGoogle = async () => {
        if (Platform.OS === 'web') {
            // On web, use pop-up
            signInWithPopup(auth, provider)
                .then((result) => {
                    if (result) {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential?.accessToken;
                        const user = result.user;
                        // console.log("Google sign in successful (popup)", user);
                    } else {
                        console.error("No result returned from signInWithPopup");
                    }
                })
                .catch((error) => {
                    console.error("Google sign in error (popup)", error);
                });
        } else {
            await googleSignIn();
        }
    };
    // const { signinWithGoogle, signout } = useFirebase();
    return (
        // <Providers>
        // <AuthProvider>
            <ScrollView>
                <KeyboardAvoidingView behavior='position' >
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.textTitlePrimary}>Let's Sign You In</Text>
                        <Text style={styles.textTitleSecondary}>Welcome Back</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput style={styles.textInput} placeholder="Enter Email" onChangeText={setEmail} />
                            <Text style={styles.text}>Password</Text>
                            <TextInput secureTextEntry style={styles.textInput} placeholder="Enter Password" onChangeText={setPassword} />
                        </View>
                        <TouchableOpacity onPress={onSignIn} style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace('/auth/sign-up')} style={styles.buttonLight}>
                            <Text style={styles.buttonTextLight}>Create Account</Text>
                        </TouchableOpacity>
                        <GoogleSigninButton
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={signInWithGoogle}
                        />
                        {/* <TouchableOpacity onPress={signInWithGoogle} style={styles.buttonLight}>
                <Text style={styles.buttonTextLight}>Sign in with Google</Text>
            </TouchableOpacity> */}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        // </AuthProvider>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 80,
        backgroundColor: Colors.white,
        height: '100%',
        gap: 20,
    },
    textTitleSecondary: {
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: Colors.gray,
    },
    textTitlePrimary: {
        fontFamily: 'outfit-bold',
        fontSize: 30,
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.gray,
        fontFamily: 'outfit',
    },
    inputContainer: {
        marginTop: 50,
        gap: 10,
        marginBottom: 20,
    },
    text: {
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
    },
});
