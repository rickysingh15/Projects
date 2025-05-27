import {View, Text, Button, StyleSheet} from 'react-native';

import Colors from '../data/color';
import CustomButton from '../components/CustomButton';
function HomeScreen({navigation, route})
{
    function onLoginPressHandler()
    {
        navigation.navigate('Login');
    }

    function onSignUpPressHandler()
    {
        navigation.navigate('Sign Up');
    }

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.mainText}> Welcome </Text>
            <Text style={styles.text}> To the best ledger in the world</Text>
            <View style={styles.buttonsContainer}>
                <CustomButton title="Login" onPress={onLoginPressHandler} color={Colors.tertiary}/>
                <CustomButton title="Sign up" onPress={onSignUpPressHandler} color={Colors.tertiary}/>
            </View>
        </View>
    );
}

export default HomeScreen;

const styles =  StyleSheet.create({

    rootContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

    mainText:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: Colors.secondary,
    },

    text:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.tertiary,
    },

    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        margin: 20
    },
});