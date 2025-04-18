import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../data/color';

function ExpenseSummary({operation, expenses, period, duration, onPress})
{
    let value = -1;

    if(operation.toLowerCase() === "average")
    {
        let totalCount = expenses.length;
        value = expenses.reduce((acc, curr) => acc + curr.amount, 0) / totalCount;
    }
    else if(operation.toLowerCase() === "max")
    {
        for(let i=0; i<expenses.length; i++)
        {
            value = Math.max(value, expenses[i].amount);   
        }
    }
    else if(operation.toLowerCase() === "min")
    {
        value = Number.MAX_SAFE_INTEGER;
        for(let i=0; i<expenses.length; i++)
        {
            value = Math.min(value, expenses[i].amount);   
        }
    }
    else
    {
        value = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }

    let filterInfo = (<View style={styles.container}>
            <Text style={{fontWeight: 'bold', color: Colors.secondary}}>No Filters</Text>
        </View>);

    if(operation !== "" && duration > 0 && period !== "")
    {
        filterInfo = (<View style={styles.container}>
                <View>
                    <Text style={styles.value}>{value.toFixed(2)}</Text>
                    <Text style={styles.operation}>{operation}</Text>
                </View>
                <Text style={styles.typeStyle}>Last {duration} {period}</Text>
            </View>);
    }

    return (
        <Pressable onPress={onPress}>
            {filterInfo}
        </Pressable>
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

    operation:{
        fontSize: 16,
        color: Colors.secondary,
    },

    valueContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    value:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.secondary,
    }
});