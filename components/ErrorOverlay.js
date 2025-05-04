import {View, Text, StyleSheet, Button} from 'react-native';
import Colors from '../data/color';
// import { Button } from 'react-native-paper';


function ErrorOverlay({message, onConfirm})
{
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Something went wrong</Text>
            <Text style={styles.text}>{message}</Text>
            <Button title="Okay"
                    onPress={onConfirm}/>
        </View>
    );
}

export default ErrorOverlay;    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
    },

    text:{
        color: Colors.primary,
        testAlign: 'center',
        marginBottom: 8
    },

    title:{
        fontSize: 20,
        fontWeight: 'bold',
    }
});

