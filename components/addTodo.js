import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { forwardRef, useImperativeHandle } from 'react';

const AddTodo = forwardRef(({ submitHandler }, ref) => {
    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    };
    useImperativeHandle(ref, () => ({
        changeHandler,
    }));
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='new todo...'
                    onChangeText={changeHandler}
                    value={text}
                    onSubmitEditing={() => submitHandler(text)}
                />
                <TouchableOpacity style={styles.button}>
                    <Button onPress={() => submitHandler(text)} title="Add todo" color='coral' />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
});

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
    },

});

export default AddTodo;