import {View, Text, Button, StyleSheet} from 'react-native';

import Colors from '../data/color';
function HomeScreen()
{
    return (
        <>
            <Text style={styles.mainText}> Welcome </Text>
            <Text style={styles.text}> To the best ledger in the world</Text>
        </>
    );
}

export default HomeScreen;

const styles =  StyleSheet.create({
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
    }
});