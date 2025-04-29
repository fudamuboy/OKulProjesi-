import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CoursesList from './CoursesList'
import CoursesOzeti from './CoursesOzeti'

export default function Courses({ coursePeriod, courses, nullText = "Henüz kurs bulunmuyor" }) {
    let content = <Text style={styles.alert}>{nullText}</Text>
    if (courses && courses.length > 0) {
        content = <CoursesList courses={courses} />
    }

    return (
        <View style={styles.container} >
            <CoursesOzeti courses={courses} periodName={coursePeriod} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 25,
    },
    alert: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray'
    }
})