import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

import ExpenseSummary from '../components/ExpenseSummary';
import Subtitle from '../components/Subtitle';
import { useState } from 'react';
import { useEffect } from 'react';

import ExpenseList from '../components/ExpenseList';
import { useSelector } from 'react-redux';

function AllExpenseScreen({navigation, route})
{
    const expenses = useSelector(  (state) => state.expensesList.expenses)
    console.log("expense len retrieved is ", expenses.length);
    const [sum , setSum] = useState(0);

    useEffect( () => {
        let total = 0;
        for(let i=0; i<expenses.length; i++)
        {
            total += expenses[i].amount;
        }
        setSum(total);
    }, [expenses]);

    

    if(expenses.length ===0)
    {
        return (
            <View>
                <Subtitle>No expenses yet</Subtitle>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ExpenseSummary type=""
                            expenses={expenses}
                            period="Last 7 days"/>
            <ExpenseList list={expenses}/>
        </View>
    );
}

export default AllExpenseScreen;

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    }
});