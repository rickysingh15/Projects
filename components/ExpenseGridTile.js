import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

import { removeExpense } from '../store/redux/expenses';
import { useDispatch } from 'react-redux';

import IconButton from './IconButton';
import MealInformation from './ExpenseInformation';
import Colors from '../data/color';

function ExpenseGridTile({id, category, amount, date, description, onPress})
{
    const dispatch = useDispatch();

    function expenseTileOnPressHandler()
    {
        console.log("Expense tile pressed for id ", id);
    }

    function onDeleteHandler()
    {
        console.log("Delete pressed for id ", id);
        dispatch(removeExpense({id: id}));
    }

    return (
        
        <View style={styles.expenseItem}>
            <Pressable android_ripple={{color: Colors.accent}}
                        style={ ({pressed}) => pressed ? styles.buttonPressed : null}
                        onPress={onPress}>
                <View style={styles.innerContainer}>
                    <MealInformation amount={amount}
                                     category={category.title}
                                     date={date}
                                     textStyle={{color: category.color}}/>
                </View>
            </Pressable>
            <IconButton icon="trash"
                        color={Colors.secondary}
                        onPress={onDeleteHandler}/>
        </View>
        
    );
}

export default ExpenseGridTile;

const styles = StyleSheet.create({
    expenseItem:{
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        padding: 8,
        margin: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.background
    },

    buttonPressed:{
        opacity: 0.5
    },  

    innerContainer:{
        overflow: 'hidden'
    }
});