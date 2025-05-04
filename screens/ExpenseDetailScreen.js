import {View, Text, StyleSheet} from 'react-native';
import ExpenseDetailCard from '../components/ExpenseDetailCard';

import LoadingOverlay from '../components/LoadingOverlay';
import { useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import IconButton from '../components/IconButton';

function ExpenseDetailScreen({navigation, route})
{

    const expenses = useSelector( (state) => state.expensesList.expenses);
    const expId = route.params.ExpenseId
    const index = expenses.findIndex((exp) => exp.id === expId);
    const [isDeleting, setIsDeleting] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {return <IconButton icon='pencil'
                                                color='white'
                                                onPress={() => {navigation.navigate('Add Expense',{id: expId})}}/>}
        })
    }, [navigation]);

    // useEffect( () => {
    //     if(index === -1)
    //     {
    //         navigation.goBack();
    //     }
    // }, [index, navigation]);

    //This if block is added to prevent rendering missing data.
    //useEffect runs after render is done so expenses[index] is run to complete the render
    // and then useEffect runs.

    if (index === -1) {
        return null;
    }

    const expToDetail = expenses[index];
    console.log("expToDetail is ", expToDetail);
    const expCategory = expToDetail.category;
    const expAmount = expToDetail.amount;
    const expDate = expToDetail.date;
    const expDescription = expToDetail.description;

    if(isDeleting)
    {
        return <LoadingOverlay message="Deleting expense..."/>;
    }

    return (
        <ExpenseDetailCard id={expId}
                           category={expCategory.title} 
                           amount={expAmount}
                           date={expDate}
                           description={expDescription}
                           cardStyle={{color: expCategory.color}}
                           onDelete={setIsDeleting}/>
    );
}

export default ExpenseDetailScreen;

const styles =  StyleSheet.create({

});