import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Courses from '../components/Courses'
import { CoursesContext } from '../store/coursesContext'
import { getLastWeek } from '../helper/date'
import { useContext } from 'react'

export default function YakinCourses() {
    const coursesContext = useContext(CoursesContext)

    const recentCourses = coursesContext.courses.filter((course) => {
        const today = new Date()
        const dateLastWeek = getLastWeek(today, 7)
        return course.date >= dateLastWeek && course.date <= today
    })

    return (
        <Courses courses={recentCourses} coursePeriod="Son 1 haftadakileri"
            nullText="Yakin Zamanda herhangi bi kurs kaydolmadinz" />
    )
}

const styles = StyleSheet.create({})