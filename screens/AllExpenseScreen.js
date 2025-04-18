import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

import ExpenseSummary from '../components/ExpenseSummary';
import Subtitle from '../components/Subtitle';
import { useState } from 'react';
import { useEffect } from 'react';

import { ApplyFilters } from '../utils/ApplyFilters';
import AddFilters from './AddFilters';
import ExpenseList from '../components/ExpenseList';
import { useSelector } from 'react-redux';

function AllExpenseScreen({navigation, route})
{
    const expenses = useSelector(  (state) => state.expensesList.expenses)
    const [sum , setSum] = useState(0);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [period, setPeriod] = useState('');
    const [duration, setDuration] = useState(0);
    const [operation, setOperation] = useState('');
    const [filteredList, setFilteredList] = useState(expenses);

    useEffect( () => {
        let total = 0;
        for(let i=0; i<expenses.length; i++)
        {
            total += expenses[i].amount;
        }
        setSum(total);

        if(period !== '' && duration > 0 && operation !== '')
        {
            setFilteredList(ApplyFilters(expenses, period, duration));
        }   
        else setFilteredList(expenses);
        
    }, [expenses, period, duration, operation]);

    console.log("filtered expenses length are ", filteredList.length);


    

    function onSummaryPressHandler()
    {
        setIsFiltersVisible(true);
    }

    return (
        <View style={styles.container}>
            <View>
                <AddFilters isVisible={isFiltersVisible}
                            setVisible={setIsFiltersVisible}
                            period={period}
                            duration={duration}
                            operation={operation}
                            setPeriod={setPeriod}
                            setDuration={setDuration}
                            setOperation={setOperation}/>
            </View>
            <ExpenseSummary period={period}
                            duration={duration}
                            operation={operation}
                            expenses={filteredList}
                            onPress={onSummaryPressHandler}/>
            <ExpenseList list={filteredList}/>
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