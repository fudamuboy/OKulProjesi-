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

export default function YonetCourses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const coursesContext = useContext(CoursesContext)

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
        coursesContext.deleteCourse(coursId)
        Alert.alert("Başarılı", "Kayıt silindi")
        navigation.goBack()
        await deleteCourseHttp(coursId)
    }
    function cancelHandler() {
        navigation.goBack()
    }

    async function addOrUpdateHandler(courseData) {
        setIsSubmitting(true)
        if (isEditing) {
            coursesContext.updateCourse(coursId, courseData)
            await updateCourseHttp(coursId, courseData)

        }
        else {
            const id = await storeCourse(courseData)
            coursesContext.addCourse({ ...courseData, id: id })
        }
        navigation.goBack()
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