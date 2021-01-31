import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignIn = () => {

    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri:
                        "https://images-platform.99static.com/Hrj0IDVBktRdEibybcXiOLqpgtE=/102x102:921x921/500x500/top/smart/99designs-contests-attachments/91/91476/attachment_91476002",
                }}
                style={{ width: 200, height: 200 }}
            />  
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>

            <Button containerStyle={styles.buttonLogin} type="outline" onPress={SignIn} title="Login" titleStyle={{color: 'white'}}/>
            <Button containerStyle={styles.buttonRegister}  type="outline" title="Register" titleStyle={{color: '#FF6200'}}/>
            <View style={{height: 30}} />
        </View>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    buttonLogin: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#FF6200",
    },
    buttonRegister: {
        width: 200,
        marginTop: 10,
    }
    
});
