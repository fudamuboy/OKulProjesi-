import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YakinCourses from './screens/YakinCourses';
import AllCourses from './screens/AllCourses';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import YonetCourses from './screens/YonetCourses';
import { useNavigation } from '@react-navigation/native';




const Tab = createBottomTabNavigator();

export default function TabBottoms() {
    const navigation = useNavigation()
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: { backgroundColor: 'gray' },
            headerTintColor: 'white', tabBarStyle: { backgroundColor: 'gray' },
            tabBarActiveTintColor: 'white',
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate('YonetCourses')}
                    style={({ pressed }) => pressed && styles.pressed}>
                    <View style={styles.iconContainer}>
                        <Feather name="plus-circle" size={24} color="white" />
                    </View>
                </Pressable>
            )
        }}>
            <Tab.Screen name="YakinCourses" component={YakinCourses} options={{
                title: 'Yakin  Zamanda ki kayitlar ',
                tabBarLabel: 'Yakin Zamanda',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="hourglass-outline" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="AllCourses" component={AllCourses} options={{
                title: 'Tum Kurslarim ',
                tabBarLabel: 'Kurslar',
                tabBarIcon: ({ color, size }) => (
                    < Ionicons name="list-circle" size={size} color={color} />
                )
            }} />


        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
    iconContainer: {
        marginVertical: 2,
        marginHorizontal: 8,
    },
})


// ajout de size zt color propre a lui restant
//tabBar kismin de sey hepsi tab.Nav icinde oluyo