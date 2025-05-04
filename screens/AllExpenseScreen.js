import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

import { setExpenses } from '../store/redux/expenses';
import { fetchExpenses } from '../utils/database';

import ExpenseSummary from '../components/ExpenseSummary';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { ApplyFilters } from '../utils/ApplyFilters';
import AddFilters from './AddFilters';
import ExpenseList from '../components/ExpenseList';
import { useSelector } from 'react-redux';

function AllExpenseScreen({navigation, route})
{
    const expenses = useSelector(  (state) => state.expensesList.expenses);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [isFetching, setIsFetching] = useState(true);
    const [period, setPeriod] = useState('');
    const [duration, setDuration] = useState(0);
    const [operation, setOperation] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, 9000));

    useEffect(() => {
        async function getExpenses()
        {
            setIsFetching(true);
            // await delay(4000);
            try
            {
                const expenses = await fetchExpenses();
                dispatch(setExpenses(expenses));
                setFilteredList(expenses);
            }
            catch(error){
                setError(error.message);
            }
            setIsFetching(false);
        }
        
        getExpenses();
    }, []);

    useEffect( () => {

        if(period !== '' && duration > 0 && operation !== '')
        {
            setFilteredList(ApplyFilters(expenses, period, duration));
        }   
        else setFilteredList(expenses);
        
    }, [expenses, period, duration, operation]);

    console.log("filtered expenses length are ", filteredList.length);

    function errorHandler()
    {
        setError(null);
    }

    if(isFetching)
    {
        return <LoadingOverlay message="Loading expenses..."/>;
    }

    if(error && !isFetching)
    {
        return <ErrorOverlay message={error}
                             onConfirm={errorHandler}/>;
    }


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