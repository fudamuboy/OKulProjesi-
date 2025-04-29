import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Courses from '../components/Courses'
import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'


export default function AllCourses() {
    const coursesContext = useContext(CoursesContext)
    return (
        <Courses courses={coursesContext.courses} coursePeriod="Tumunu yani Hepsini "
            nullText="Herhangi bi kursa kayitli degilsiniz" />
    )
}

const styles = StyleSheet.create({})