import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

import { removeExpense } from '../../store/redux/expenses';
import { useDispatch } from 'react-redux';

import IconButton from '../IconButton';

import Colors from '../../data/color';

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
        
        // <View style={styles.expenseItem}>
        //     <Pressable android_ripple={{color: Colors.accent}}
        //                 style={ ({pressed}) => pressed ? styles.buttonPressed : null}
        //                 onPress={onPress}>
        //         <View style={styles.innerContainer}>
        //             <ExpenseInformation amount={amount}
        //                              category={category.title}
        //                              date={date}
        //                              textStyle={{color: category.color}}/>
        //         </View>
        //     </Pressable>
        //     <IconButton icon="trash"
        //                 color={Colors.secondary}
        //                 onPress={onDeleteHandler}/>
        // </View>

        <Pressable onPress={onPress}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    {/* <Text style={styles.textBase}>{getFormattedDate(date)}</Text> */}
                    <Text style={styles.textBase}>{date}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseGridTile;

const styles = StyleSheet.create({
    expenseItem:{
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.main,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: Colors.accent,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
    },

    textBase: {
        color: Colors.primary,
    },  

    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },

    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },

    amount:{
        color: Colors.primary,
        fontWeight: 'bold',
    },

    buttonPressed:{
        opacity: 0.5
    },  

    innerContainer:{
        overflow: 'hidden'
    }
});