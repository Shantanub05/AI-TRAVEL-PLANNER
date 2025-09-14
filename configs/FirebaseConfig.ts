// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {

  apiKey: "AIzaSyB7vvRNAl5dJM-21HtTLoC4CBck5P8_-Vg",

  authDomain: "ai-travel-planner-a674c.firebaseapp.com",

  projectId: "ai-travel-planner-a674c",

  storageBucket: "ai-travel-planner-a674c.firebasestorage.app",

  messagingSenderId: "1056489445891",

  appId: "1:1056489445891:web:93e9b42b8e360a57fe8c36"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with platform-specific configuration
export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//Android client id 
// 969237865367-rank41c13q49jo25eguihue11ikva3gu.apps.googleusercontent.com 
