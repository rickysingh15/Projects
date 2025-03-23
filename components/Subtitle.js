import {Text, View, StyleSheet} from 'react-native';

import Colors from '../data/color';


function Subtitle({children})
{
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{children}</Text>
        </View>
    );
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.tertiary,
    },

    subtitleContainer:{
        padding: 6,
        borderBottomColor: Colors.accent,
        borderBottomWidth: 2,
        marginHorizontal: 12,
        marginVertical: 8
    }
});