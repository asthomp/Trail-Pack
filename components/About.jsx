import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Card, Text} from "react-native-paper"
import LinkButton from "./LinkButton"


export default function About() {
    return (
        <View style={style.aboutContainer}>
            <Card style={style.aboutCard}>
                <Card.Cover source={{uri: '/assets/tent.jpg'}}/>
                <Card.Title title="About Us"/>
                <Card.Content>
                    <Text style={style.aboutText}>Peacock and Sunshine are both avid backpackers who enjoy spending
                        their time hiking
                        in the Pacific Northwest.</Text>
                    <LinkButton text="Return Home" link="/" mode="dark"/>
                </Card.Content>
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    aboutContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "20%"
    },
    aboutCard: {
        marginLeft: 15,
        marginRight: 15
    },
    aboutText: {
        marginBottom: 20,
    }
})