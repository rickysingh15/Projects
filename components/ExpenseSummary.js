import {View, Text, StyleSheet} from 'react-native';
import Colors from '../data/color';

function ExpenseSummary({type, expenses, period})
{
    let value = -1;
    if(type === "average")
    {
        let totalCount = expenses.length;
        value = expenses.reduce((acc, curr) => acc + curr.amount, 0) / totalCount;
    }
    else if(type === "max")
    {
        for(let i=0; i<expenses.length; i++)
        {
            value = Math.max(value, expenses[i].amount);   
        }
    }
    else if(type === "min")
    {
        for(let i=0; i<expenses.length; i++)
        {
            value = Math.min(value, expenses[i].amount);   
        }
    }
    else
    {
        value = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.value}>{value.toFixed(2)}</Text>
            <Text style={styles.typeStyle}>{type}</Text>
            <Text style={styles.period}>{period}</Text>
        </View>
    );
}

export default ExpenseSummary;

const styles = StyleSheet.create({
    container: {
        padding: 26,
        margin: 2,
        backgroundColor: Colors.accent,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    period:{
        fontSize: 12,
        color: Colors.secondary,
    },

    typeStyle:{
        fontSize: 12,
        color: Colors.secondary,
    },

    value:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.secondary,
    }
});