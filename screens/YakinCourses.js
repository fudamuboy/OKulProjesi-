import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Courses from '../components/Courses'
import { CoursesContext } from '../store/coursesContext'
import { getLastWeek } from '../helper/date'
import { useContext } from 'react'
import { getCourse } from '../helper/http'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorText from '../components/ErrorText'

export default function YakinCourses() {
    const coursesContext = useContext(CoursesContext)

    const [fetchedCourses, setFetchedCourses] = useState([])
    const [isfetching, setIsfetching] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {

        async function takeCourses() {
            setError(null)
            setIsfetching(true)
            try {

                const course = await getCourse()
                coursesContext.setCourse(course)
            } catch (error) {
                setError('Kurslari cekemedik ')
            }

            // setFetchedCourses(course)
            setIsfetching(false)
        }

        takeCourses()
    }, [])

    if (error && !isfetching) {
        <ErrorText message={error} />
    }

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