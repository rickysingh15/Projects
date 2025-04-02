import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

import Subtitle from '../components/Subtitle';

import ExpenseList from '../components/ExpenseList';
import { useSelector } from 'react-redux';

function AllExpenseScreen({navigation, route})
{
    const expenses = useSelector(  (state) => state.expensesList.expenses)
    console.log("expense len retrieved is ", expenses.length);
    // for(let i=0; i<expenses.length; i++)
    // {
    //     console.log("expense is ", expenses[i]);
    // }

    if(expenses.length ===0)
    {
        return (
            <View>
                <Subtitle>No expenses yet</Subtitle>
            </View>
        );
    }

    return (
        <ExpenseList list={expenses}/>
    );
}

export default AllExpenseScreen;

const styles =  StyleSheet.create({

});