import 'react-native-get-random-values';

import {View, Text, Button, StyleSheet, TextInput, Modal} from 'react-native';
import Colors from '../data/color';

import { useState } from 'react';
import {addExpense} from '../store/redux/expenses';
import {useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import shortUuid from 'short-uuid';

import Subtitle from '../components/Subtitle';
import Expense from '../models/expense';
import { CATEGORIES } from '../data/dummy-data';
import AddCategory from './AddCategory';

import DropDownPicker from 'react-native-dropdown-picker';

function AddExpenseScreen()
{   

    const expenses = useSelector( (state) => state.expensesList.expenses);
    const categories = useSelector( (state) => state.categoriesList.all_categories);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [value , setValue] = useState(null);

    // const [categories, setCategories] = useState(CATEGORIES);
    const [openDropDown, setOpenDropDown] = useState(false);
    const dispatch = useDispatch();

    function setAmountHandler(num)
    {
        setAmount(num);
    }

    function setDescriptionHandler(remark)
    {
        setDescription(remark);
    }

    function onSubmitHandler()
    {   
        console.log("value is ", value);
        console.log("cat len is ", categories.length);
        const index = categories.findIndex(cat => cat.id === value);
        console.log("index is ", index);
        console.log("category selected is ", categories[index]);
        const uuid = shortUuid.generate();
        console.log("uuid is ", uuid);

        const serializedCat = {
            id: categories[index].id,
            title: categories[index].title,
            color: categories[index].color
        }

        // const exp = new Expense(uuid.toString(), serializedCat.id, parseFloat(amount), new Date().toISOString(), description);
        const exp = {
            id: uuid.toString(),
            category: serializedCat,
            amount: parseFloat(amount), // Ensure amount is a number
            date: new Date().toISOString(),
            description: description,
        };
        dispatch(addExpense({expense: exp}));
        console.log("expense is ", exp);

    }

    function onResetHandler()
    {
        setAmount('');
        setDescription('');
        setValue(null);
    }

    return (
        <View style={styles.rootContainer}>
            <Subtitle>Enter your Expense</Subtitle>
            <View style={styles.inputsContainer}>
                <View>
                    <Text>Amount</Text>
                    <TextInput  style={styles.textInputContainer}
                                keyboardType='numeric'
                                placeholder='Enter Amount'
                                onChangeText={setAmountHandler}
                                value={amount}/>
                </View>
                <View>
                    <Text>Category</Text>
                    <DropDownPicker schema={{
                                        label: 'title',
                                        value: 'id',
                                    }}
                                    open={openDropDown}
                                    value={value}
                                    items={categories}
                                    setOpen={setOpenDropDown}
                                    setValue={setValue}
                                    />
                </View>
                <View>
                    <Text>Remarks</Text>
                    <TextInput  style={styles.textInputContainer}
                                keyboardType='default'
                                placeholder='Remark'
                                onChangeText={setDescriptionHandler}
                                value={description}/>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Button title='Submit'
                        onPress={onSubmitHandler}/>
                <Button title='Reset'
                        onPress={onResetHandler}/>
            </View>
            <View>
                {modalVisible && <AddCategory isVisible={modalVisible}
                                              setVisible={setModalVisible}/>}
            </View>
            <Button title='Add Category'
                    onPress={() => setModalVisible(true)}/>
        </View>
    );
}

export default AddExpenseScreen;

const styles =  StyleSheet.create({

    rootContainer:{
        flex: 1,
        alignItems: 'center',
        padding: 18,
    },

    textInputContainer:{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.secondary,
    },

    inputsContainer:{
        padding: 8

    },

    buttonsContainer:{
        padding: 8,
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});