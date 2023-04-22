import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const ItemButton = ({ text, style, onPress, type = "item" }) => {
    const [pressed, setPressed] = React.useState(false);
    return (
        <TouchableWithoutFeedback onPress={onPress} onPressIn={() => {setPressed(true)}} onPressOut={() => {setPressed(false)}}>
            <View style={[styles.button, pressed && type == "item" ? styles.buttonPressed : null, style]}>
                <Text style={styles.buttonText}>{text}</Text>
                {type == "add" ? <MaterialIcons name="add" size={24} color="white" /> : null}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#2DD600',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: '#FF5200',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
})

export default ItemButton;