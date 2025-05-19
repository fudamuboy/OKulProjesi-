import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Courses from '../components/Courses'
import { CoursesContext } from '../store/coursesContext'
import { getLastWeek } from '../helper/date'
import { useContext } from 'react'
import { getCourse } from '../helper/http'
import LoadingSpinner from '../components/LoadingSpinner'

export default function YakinCourses() {
    const coursesContext = useContext(CoursesContext)

    const [fetchedCourses, setFetchedCourses] = useState([])
    const [isfetching, setIsfetching] = useState(true)

    useEffect(() => {
        async function takeCourses() {
            setIsfetching(true)
            const course = await getCourse()
            coursesContext.setCourse(course)
            // setFetchedCourses(course)
            setIsfetching(false)
        }

        takeCourses()
    }, [])
    if (isfetching) {
        return <LoadingSpinner />
    }
    const upcomingCourses = coursesContext.courses?.filter((course) => {
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        return course.date >= today && course.date <= nextWeek
    }) || []

    return (
        <Courses courses={upcomingCourses} coursePeriod="Gelcek Haftalar"
            nullText="No classes planned for the next few days" />
    )
}

const styles = StyleSheet.create({})    