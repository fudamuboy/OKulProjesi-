import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoadingSpinner() {
    return (
        <View style={styles.container} >
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

})