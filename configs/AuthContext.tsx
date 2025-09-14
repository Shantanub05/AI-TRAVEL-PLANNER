import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Google Sign In with the correct configuration
GoogleSignin.configure({
    webClientId: '1056489445891-p69mdlhgngprardikmdpkh54s9vh2hf8.apps.googleusercontent.com', // Web client for Firebase Auth
    offlineAccess: true,
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

type AuthContextType = {
    user: User | null;
    loading: boolean;
    googleSignIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Handle auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (loading) setLoading(false);
        });

        // Unsubscribe on unmount
        return unsubscribe;
    }, [loading]);

    // Google Sign In function
    const googleSignIn = async (): Promise<void> => {
        try {
            console.log('🔍 Starting Google Sign In process...');

            // Check if your device supports Google Play
            console.log('🔍 Checking Play Services...');
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            console.log('✅ Play Services available');

            // Get the user ID token
            console.log('🔍 Attempting Google Sign In...');
            const userInfo = await GoogleSignin.signIn();
            console.log('✅ Google Sign In successful, user info:', userInfo);

            const idToken = userInfo.data?.idToken;
            console.log('🔍 ID Token received:', idToken ? '✅ Present' : '❌ Missing');

            if (!idToken) {
                throw new Error('No ID token received from Google Sign In');
            }

            // Create a Google credential with the token
            console.log('🔍 Creating Firebase credential...');
            const googleCredential = GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            console.log('🔍 Signing in to Firebase...');
            await signInWithCredential(auth, googleCredential);
            console.log('✅ Firebase sign in successful');
        } catch (error) {
            console.error('❌ Google Sign In Error:', error);
            console.error('Error details:', {
                code: (error as any)?.code,
                message: (error as any)?.message,
                userInfo: (error as any)?.userInfo,
            });
            throw error;
        }
    };

    // Sign Out function
    const signOut = async (): Promise<void> => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Sign Out Error:', error);
            throw error;
        }
    };

    // Context value
    const contextValue = {
        user,
        loading,
        googleSignIn,
        signOut
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
