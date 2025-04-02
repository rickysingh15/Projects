import {View, Text, StyleSheet} from 'react-native';

function MealInformation({amount, category, date, textStyle})
{
    return (
        <View style={styles.details}>
            <Text style={[styles.detailItem, textStyle]}>Rs {amount}/-</Text>
            <Text style={[styles.detailItem, textStyle]}>{category}</Text>
        </View>
    );
}

export default MealInformation;

const styles = StyleSheet.create({
    details:{
        padding:8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    detailItem:{
        marginHorizontal: 4
    }
});