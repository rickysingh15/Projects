import {View, Text, TextInput, Button, StyleSheet, Pressable} from 'react-native';
import Colors from '../data/color';

function CustomButton({title, onPress, color})
{
    return (
        <Pressable onPress={onPress}
                    style={({pressed}) => pressed && styles.pressed}
                    android_ripple={{color: Colors.primary}}>
            <View style={[styles.button, {backgroundColor: color}]}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default CustomButton;

const styles = StyleSheet.create({

    pressed:{
        opacity: 0.7,
        backgroundColor: Colors.primary,
    },

    button: {
        height: 40,
        width: 100,
        borderRadius: 6,
        padding: 8,
    },

    buttonText:{
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});