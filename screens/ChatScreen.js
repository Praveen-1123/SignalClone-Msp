import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableWithoutFeedback } from 'react-native'
import { db, auth } from '../firebase'
import * as firebase from "firebase"

const ChatScreen = ({navigation, route}) => {

    const [ input, setInput ] = useState("");
    const [ messages, setMessages ] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat Screen",
            headerTitleAlign: "left",
            headerTitle: () => (
                <View 
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar rounded source={{uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}/>
                    <Text 
                        style= {{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                        {route.params.chatName}
                        </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={25} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={25} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "desc").
        onSnapshot((snapshot) => setMessages( 
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
            return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height" }
                style= {styles.container}
                keyboardVerticalOffset={90}>

            <TouchableWithoutFeedback onPress= {Keyboard.dismiss}>

            <>
                <ScrollView>
                    {messages.map(({id, data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                                <Avatar 
                                    position="absolute"
                                    bottom={-15}
                                    //WEB
                                    containerStyle={{
                                        position:"absolute",
                                        bottom: -15,
                                        right: -5
                                    }}

                                    right={-5}
                                    rounded
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                }}/>
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ): (
                            <View style={styles.sender}> 
                                <Avatar />
                                <Text style={styles.senderText}>{data.message}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                    value={input} 
                    onChangeText={(text) => setInput(text)} 
                    onSubmitEditing={sendMessage}
                    placeholder="Clone Message" 
                    style={styles.textInput}/> 
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name= "send" size={25} color="#FF6200"/>
                    </TouchableOpacity>
                </View>
            </>        
            </TouchableWithoutFeedback> 
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#FF6200",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    }
})
