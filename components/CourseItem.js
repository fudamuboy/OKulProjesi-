import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFormattedDate } from '../helper/date'
import { useNavigation } from '@react-navigation/native'

export default function CourseItem({ amount, date, description, id }) {

    const navigation = useNavigation()
    function coursPress() {
        navigation.navigate('YonetCourses', { coursId: id })
    }
    return (
        <Pressable onPress={coursPress}>
            <View style={styles.courseContainer}>
                <View>
                    <Text style={styles.description}>{description} </Text>
                    <Text>{getFormattedDate(date)} </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{amount} </Text>
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    courseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        marginVertical: 8,
        padding: 12,
        elevation: 4,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        borderRadius: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    priceContainer: {
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    price: {
        color: 'blue',
        fontWeight: 'bold',
    },
})