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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
        try {
            if (Platform.OS === 'web') {
                // On web, use pop-up
                const result = await signInWithPopup(auth, provider);
                if (result) {
                    router.replace('/MyTrip');
                    ToastAndroid.show('Google Sign-in successful!', ToastAndroid.BOTTOM);
                } else {
                    console.error("No result returned from signInWithPopup");
                    ToastAndroid.show('Google Sign-in failed', ToastAndroid.BOTTOM);
                }
            } else {
                // On mobile, use the context function
                await googleSignIn();
                router.replace('/MyTrip');
                ToastAndroid.show('Google Sign-in successful!', ToastAndroid.BOTTOM);
            }
        } catch (error: any) {
            console.error("Google sign in error:", error);

            // Handle specific DEVELOPER_ERROR
            if (error?.code === 'com.google.android.gms.common.api.ApiException' ||
                error?.message?.includes('DEVELOPER_ERROR') ||
                error?.toString?.()?.includes('DEVELOPER_ERROR')) {
                ToastAndroid.show(
                    'Google Sign-in configuration issue. Please use email/password sign-in or contact support.',
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show('Google Sign-in failed. Please try again.', ToastAndroid.BOTTOM);
            }
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
                        <TouchableOpacity onPress={signInWithGoogle} style={styles.googleButton} activeOpacity={0.8}>
                            <View style={styles.googleButtonContent}>
                                <View style={styles.googleIconContainer}>
                                    <View style={styles.googleIconBg}>
                                        <Text style={styles.googleIcon}>G</Text>
                                    </View>
                                </View>
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                                <Ionicons name="arrow-forward" size={20} color="#5f6368" style={styles.arrowIcon} />
                            </View>
                        </TouchableOpacity>
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
    googleButton: {
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        borderRadius: 16,
        padding: 18,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    googleIconContainer: {
        marginRight: 16,
    },
    googleIconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4285f4',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#4285f4",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    googleIcon: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: 'outfit-bold',
        fontWeight: 'bold',
    },
    googleButtonText: {
        color: '#2d3436',
        fontSize: 16,
        fontFamily: 'outfit-medium',
        flex: 1,
        textAlign: 'center',
    },
    arrowIcon: {
        marginLeft: 16,
    },
});
