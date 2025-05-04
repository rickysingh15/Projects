import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../data/color';


function LoadingOverlay({message})
{
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.tertiary} />
            <Text>{message}</Text>
        </View>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
    }
});

