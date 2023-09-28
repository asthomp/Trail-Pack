import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';


export default function Front({navigation}) {
    return (
        <View style={style.container}>
            <Text>Peacock & Sunshine's Really Great App!</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Details')}>
                Go to details
            </Button>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});