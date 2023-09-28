import {StyleSheet, Text, View} from 'react-native'
import {Card} from 'react-native-paper'
import React from "react"
import frontImage from '../assets/map.jpg'
import LinkButton from "./LinkButton"


export default function Front() {
    return (
        <View style={style.frontContainer}>
            <Card style={style.frontCard}>
                <Card.Cover source={frontImage}/>
                <Card.Title title="Welcome"/>
                <Card.Content><Text style={style.frontText}>This is Peacock and Sunshine's really great app.
                    Wow! You can click the button to learn more.</Text>
                    <LinkButton text="About Us" link="/details"/>
                </Card.Content>
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    frontContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
        paddingTop: "20%"
    },
    frontCard: {
        marginLeft: 15,
        marginRight: 15
    },
    frontText: {
        marginBottom: 20,
    }
})