import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Card} from "react-native-paper"
import aboutImage from '../assets/tent.jpg'
import LinkButton from "./LinkButton"


export default function About() {
    return (
        <View style={style.aboutContainer}>
            <Card style={style.aboutCard}>
                <Card.Cover source={aboutImage}/>
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
        alignItems: 'center',
        justifyContent: 'start',
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