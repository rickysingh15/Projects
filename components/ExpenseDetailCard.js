import {View, Text, StyleSheet} from 'react-native';
import Subtitle from './Subtitle';
import Colors from '../data/color';
function ExpenseDetailCard({category, amount, date, description, amountTextStyle})
{
    return (
        <View style={styles.rootContainer}>
            <Subtitle>{description}</Subtitle>
            <Text style={styles.descriptionContainer}>{category}</Text>
            <Text style={styles.amountContainer}>Rs {amount}</Text>
        </View>
    );
}

export default ExpenseDetailCard;

const styles =  StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
    },

    descriptionContainer:{
        fontSize: 20,
        fontWeight: 'normal',
        color: Colors.secondary
    },

    amountContainer:{
        
    }
});