import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useContext } from 'react'
import { CoursesContext } from '../store/coursesContext'
import CoursForm from '../components/CoursForm';

export default function YonetCourses({ route, navigation }) {

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
    function deleteCourse() {
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
        coursesContext.deleteCourse(coursId)
        Alert.alert("Başarılı", "Kayıt silindi")
        navigation.goBack()
    }
    function cancelHandler() {
        navigation.goBack()
    }

    function addOrUpdateHandler(courseData) {
        if (isEditing) {
            coursesContext.updateCourse(coursId, courseData)

        }
        else {
            coursesContext.addCourse(courseData)
        }
        navigation.goBack()
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