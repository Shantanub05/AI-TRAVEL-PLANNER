import Login from "@/components/Login";
import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View } from "react-native";


interface User  {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
  readonly uid: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
    // console.log(".................................")
    // console.log("This is log",currentUser)
  })
  return (
    <View >
      {user ? <Redirect href={'/MyTrip' } /> : <Login />}
    </View>
  );
}

export default Index
