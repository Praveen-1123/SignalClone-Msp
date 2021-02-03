import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from "react-native-elements"
import { auth } from "../firebase";

const RegisterScreen = ({ navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({

        })
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            });
        }).catch(error => alert(error.message))
    };

    return (
        <View behavior="padding" style={styles.container}>
            <StatusBar style='light'/>

            <Text h3 style={{ marginBottom: 50}}>
                Create an account
            </Text>
            <View style={styles.inputContainer} >
                <Input 
                    placeholder='Full Name'
                    autoFocus type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder='Profile Picture Url (optional)'
                    type='text'
                    value={imageURL}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                containerStyle={styles.Button}
                onPress= {register}
                title="Register"
                type="clear" 
                titleStyle={{color: 'white'}}
            />
            <View style={{height: 30}}/>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    Button: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#FF6200",
    },
    inputContainer: {
        width: 300,
    },
});
