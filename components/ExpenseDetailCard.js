import {View, Text, StyleSheet} from 'react-native';

import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { removeExpense } from '../store/redux/expenses';
import { useNavigation } from '@react-navigation/native';

import LoadingOverlay from './LoadingOverlay';
import { deleteExpense } from '../utils/database';
import Subtitle from './Subtitle';
import Colors from '../data/color';
import IconButton from './IconButton';

function ExpenseDetailCard({id, category, amount, date, description, cardStyle, onDelete})
{
    console.log("ExpenseDetailCard called with id ", id);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const ms = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function onDeleteExpenseHandler()
    {
        console.log("Delete pressed for id ", id);
        onDelete(true);
        await deleteExpense(token, id);
        dispatch(removeExpense({id: id}));
        navigation.goBack();
    }

    return (
        <View style={styles.rootContainer}>
            <Subtitle>{description}</Subtitle>
            <View style={styles.details}>
                <Text style={styles.descriptionContainer}>{category}</Text>
                <Text style={[styles.amountContainer, cardStyle]}>Rs {amount}</Text>
                <Text style={styles.dateContainer}>{date}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <IconButton icon="trash"
                            color={Colors.secondary}
                            onPress={onDeleteExpenseHandler}/>
            </View>
        </View>
    );
}

export default ExpenseDetailCard;

const styles =  StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
    },

    descriptionContainer:{
        fontSize: 20,
        fontWeight: 'normal',
        color: Colors.secondary
    },

    details:{
        flexDirection: 'column',
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
    },  

    amountContainer:{
        margin: 12,
        fontSize: 30,
    },

    dateContainer:{

    }
});