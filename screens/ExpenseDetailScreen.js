import {View, Text, StyleSheet} from 'react-native';
import ExpenseDetailCard from '../components/ExpenseDetailCard';

function ExpenseDetailScreen({navigation, route})
{
    const expId = route.params.ExpenseId
    const expCategory = route.params.ExpCategory
    const expAmount = route.params.ExpAmount
    const expDate = route.params.ExpDate
    const expDescription = route.params.ExpDescription

    return (
        <ExpenseDetailCard category={expCategory.title} 
                           amount={expAmount}
                           date={expDate}
                           description={expDescription}
                           cardStyle={{color: expCategory.color}}/>
    );
}

export default ExpenseDetailScreen;

const styles =  StyleSheet.create({

});