import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
        }}>
            <Tabs.Screen name='Discover' options={{ tabBarIcon: ({ color }) => <Entypo name="location-pin" size={24} color={color} /> }} />
            <Tabs.Screen name='MyTrip' options={{ tabBarIcon: ({ color }) => <Ionicons name="globe-sharp" size={24} color={color} /> }} />
            <Tabs.Screen name='Profile' options={{ tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} /> }} />
        </Tabs>
    )
}
export default _layout