import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CoursesOzeti({ periodName, courses }) {
    // Vérification que courses existe et est un tableau
    const coursesSum = courses && Array.isArray(courses)
        ? courses.reduce((i, course) => {
            return i + course.amount
        }, 0)
        : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{periodName}</Text>
            <Text style={styles.cost}>{coursesSum}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 12,


    },
    title: {
        color: 'white',
        fontSize: 12,
        fontSize: 15,

    },
    cost: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',

    },
})


// Ozeti ile ekrana gosteri yapiommm simdi 