import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'
import CoursForm from '../components/CoursForm';
import { deleteCourseHttp, storeCourse, updateCourseHttp } from '../helper/http';
import { usePreventRemove } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function YonetCourses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const coursesContext = useContext(CoursesContext)
    const [error, setError] = useState()
    const coursId = route.params?.coursId

    let isEditing = false

    const selectedCourse = coursesContext.courses.find((course) =>
        course.id === coursId)

    if (coursId) {
        isEditing = true
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Kursu Guncelle' : 'Kursu Ekle',
        })
    }, [navigation, isEditing])


    const buttonLabel = isEditing ? 'Guncelle' : 'Ekle';
    // function retour en arriere
    async function deleteCourse() {
        // Alert.alert(
        //     "Kursu Sil",
        //     "Bu kursu silmek istediğinizden emin misiniz?",
        //     [
        //         {
        //             text: "İptal",
        //             style: "cancel"
        //         },
        //         {
        //             text: "Sil",
        //             style: "destructive",
        //             onPress: () => {
        //                 try {
        //                     coursesContext.deleteCourse(coursId)
        //                     Alert.alert("Başarılı", "Kayıt silindi")
        //                     navigation.goBack()
        //                 } catch (error) {
        //                     Alert.alert("Hata", "Kurs silinirken bir hata oluştu")
        //                 }
        //             }
        //         }
        //     ]
        // )
        setIsSubmitting(true)
        setError(null)
        try {
            coursesContext.deleteCourse(coursId)
            navigation.goBack()
            await deleteCourseHttp(coursId)
        } catch (error) {
            setError('Kurslar silemedik')
            setIsSubmitting(false)
        }

    }
    if (error && !isSubmitting) {
        return <ErrorText message={error} />
    }
    function cancelHandler() {
        navigation.goBack()
    }

    async function addOrUpdateHandler(courseData) {
        setIsSubmitting(true)
        setError(null)
        try {
            if (isEditing) {
                coursesContext.updateCourse(coursId, courseData)
                await updateCourseHttp(coursId, courseData)
            } else {
                const id = await storeCourse(courseData)
                coursesContext.addCourse({ ...courseData, id: id })
            }
            navigation.goBack()
        } catch (error) {

            setError('Eklemede ve guncellemede bi hata var')

            setIsSubmitting(false)
        }
    }

    if (isSubmitting) {
        return <LoadingSpinner />
    }

    return (
        <View style={styles.container}>
            <CoursForm
                buttonLabel={buttonLabel}
                onSubmit={addOrUpdateHandler}
                cancelHandler={cancelHandler}
                defaultValues={selectedCourse} />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <EvilIcons name="trash" size={36} color="black" onPress={deleteCourse} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },

    deleteContainer: {
        alignItems: 'center',
        borderTopWidth: 3,
        borderTopColor: 'blue',
        paddingTop: 10,
        marginTop: 16,
    },
})