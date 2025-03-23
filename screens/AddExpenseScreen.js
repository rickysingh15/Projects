import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import Colors from '../data/color';
import Expense from '../models/expense';
import Category from '../models/category';

import { useState } from 'react';

import Subtitle from '../components/Subtitle';

function AddExpenseScreen()
{
    const [amount, setAmount] = useState('');

    function setAmountHandler(num)
    {
        setAmount(num);
    }

    return (
        <View>
            <Subtitle>Enter your Expense</Subtitle>
            <View>
                <TextInput style={styles.textInputContainer}
                           keyboardType='numeric'
                           placeholder='Enter Amount'
                           onChangeText={setAmountHandler}
                           value={amount}/>
            </View>
        </View>
    );
}

export default AddExpenseScreen;

const styles =  StyleSheet.create({
    textInputContainer:{
        borderWidth: 2,
        borderColor: Colors.secondary,
    }

});