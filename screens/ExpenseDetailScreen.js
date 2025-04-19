import {View, Text, StyleSheet} from 'react-native';
import ExpenseDetailCard from '../components/ExpenseDetailCard';

import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';

function ExpenseDetailScreen({navigation, route})
{

    const expenses = useSelector( (state) => state.expensesList.expenses);
    const expId = route.params.ExpenseId

    const index = expenses.findIndex((exp) => exp.id === expId);
    const expToDetail = expenses[index];
    if(index === -1)
    {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.noExpensesText}>No expenses found</Text>
            </View>
        );
    }

    const expCategory = expToDetail.category;
    const expAmount = expToDetail.amount;
    const expDate = expToDetail.date;
    const expDescription = expToDetail.description;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {return <IconButton icon='pencil'
                                                color='white'
                                                onPress={() => {navigation.navigate('Add Expense',{id: expId})}}/>}
        })
    }, [navigation]);

    return (
        <ExpenseDetailCard id={expId}
                           category={expCategory.title} 
                           amount={expAmount}
                           date={expDate}
                           description={expDescription}
                           cardStyle={{color: expCategory.color}}/>
    );
}

export default ExpenseDetailScreen;

const styles =  StyleSheet.create({

});