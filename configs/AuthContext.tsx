import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Google Sign In with the correct configuration
GoogleSignin.configure({
    webClientId: '1056489445891-p69mdlhgngprardikmdpkh54s9vh2hf8.apps.googleusercontent.com',
    offlineAccess: true, // Add this if you need offline access
    // Remove client_type: 3 as it's not a valid parameter
});

type AuthContextType = {
    user: FirebaseAuthTypes.User | null;
    loading: boolean;
    googleSignIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Handle auth state changes
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            if (loading) setLoading(false);
        });

        // Unsubscribe on unmount
        return subscriber;
    }, [loading]);

    // Google Sign In function
    const googleSignIn = async (): Promise<void> => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the user ID token - correct access pattern
            const userInfo = await GoogleSignin.signIn();

            // According to the latest structure, we need to access the token correctly
            // Based on the search results, it might be structured differently
            const idToken = userInfo.data?.idToken ;

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken ?? null);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.error('Google Sign In Error:', error);
            throw error;
        }
    };

    // Sign Out function
    const signOut = async (): Promise<void> => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            console.error('Sign Out Error:', error);
            throw error;
        }
    };

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user,
        loading,
        googleSignIn,
        signOut
    }), [user, loading]);

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
