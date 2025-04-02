import {View, Text, StyleSheet} from 'react-native';
import Subtitle from './Subtitle';
import Colors from '../data/color';
function ExpenseDetailCard({category, amount, date, description, cardStyle})
{
    console.log("cardStyle is ", cardStyle);

    return (
        <View style={styles.rootContainer}>
            <Subtitle>{description}</Subtitle>
            <View style={styles.details}>
                <Text style={styles.descriptionContainer}>{category}</Text>
                <Text style={[styles.amountContainer, cardStyle]}>Rs {amount}</Text>
                <Text style={styles.dateContainer}>{date}</Text>
            </View>
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

    details:{
        flexDirection: 'column',
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    amountContainer:{
        margin: 12,
        fontSize: 30,
    },

    dateContainer:{

    }
});