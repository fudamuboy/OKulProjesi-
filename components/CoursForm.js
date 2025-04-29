import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import { getFormattedDate } from '../helper/date';

export default function CoursForm({ cancelHandler, onSubmit, buttonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true, },
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
    });

    function addOrUpdateHandler() {
        const courseData = {
            amount: Number(inputs.amount.value),
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        console.log(courseData);

        const amountIsValid = courseData.amount > 0


        // Vérification si la date est vide ou invalide
        const dateIsValid = courseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = courseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInputs) => {
                return {
                    amount: { value: Number(currentInputs.amount.value), isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        onSubmit(courseData)
    }
    function inputChange(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => ({
            ...currentInputs,
            [inputIdentifier]: { value: enteredValue, isValid: true },
        }));
    }

    return (
        <View style={styles.form}>
            <Text style={styles.basligi}>Kurs Bilgileri</Text>

            <View style={styles.priceAndDate}>
                <Input
                    style={styles.flexAll}
                    label="Tutar"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChange.bind(this, 'amount'),
                        value: inputs.amount.value.toString()
                    }}
                />
                <Input
                    style={styles.flexAll}
                    label="Tarih"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChange.bind(this, 'date'),
                        value: inputs.date.value,
                    }}
                />
            </View>

            <Input
                label="Başlık Bilgisi"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChange.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />
            <View style={styles.error}>
                {!inputs.amount.isValid && (
                    <Text>
                        Luften tutari dogru formatta giriniz
                    </Text>
                )}
                {!inputs.date.isValid && (
                    <Text>
                        Luften tutari dogru formatta giriniz
                    </Text>
                )}
                {!inputs.description.isValid && (
                    <Text>
                        Luften tutari dogru formatta giriniz
                    </Text>
                )}
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={cancelHandler}>
                    <View style={styles.cancel}>
                        <Text style={styles.textIptal}>Iptal Et</Text>
                    </View>
                </Pressable>
                <Pressable onPress={addOrUpdateHandler}>
                    <View style={styles.addOrDelete}>
                        <Text style={styles.textAdd}>
                            {buttonLabel}
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    priceAndDate: {
        flexDirection: 'row',
        gap: 8,
    },
    flexAll: {
        flex: 1,
    },
    form: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    basligi: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        marginVertical: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    cancel: {
        backgroundColor: 'red',
        minWidth: 120,
        padding: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    textIptal: {
        color: 'white',
    },
    addOrDelete: {
        backgroundColor: 'blue',
        minWidth: 120,
        padding: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    textAdd: {
        color: 'white',
    },
    error: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});
