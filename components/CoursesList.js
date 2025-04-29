import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import CourseItem from './CourseItem';

export default function CoursesList({ courses }) {

    function renderCourseItem(itemData) {
        // console.log(itemData); // et puis recuperation des item grace a CourseItem
        return <CourseItem {...itemData.item} /> // ekran bastirmak icin bunu kullanalim

    }
    return (
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={renderCourseItem} />
    )
}

const styles = StyleSheet.create({})