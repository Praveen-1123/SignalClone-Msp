import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser){
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, [])

    const SignIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri:
                        "https://images-platform.99static.com/Hrj0IDVBktRdEibybcXiOLqpgtE=/102x102:921x921/500x500/top/smart/99designs-contests-attachments/91/91476/attachment_91476002",
                }}
                style={{ width: 222, height: 222 }}
            />  
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={SignIn}/>
            </View>

            <Button onPress={SignIn} 
                containerStyle={styles.buttonLogin} type="outline" title="Login" titleStyle={{color: 'white'}}/>
            <Button onPress={() => navigation.navigate('Register')}
                containerStyle={styles.buttonRegister}  type="outline" title="Register" titleStyle={{color: '#FF6200'}}/>
            <View style={{height: 50}} />
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
