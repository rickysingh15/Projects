import 'react-native-get-random-values';

import {View, Text, Button, StyleSheet, TextInput, Modal, Alert} from 'react-native';
import Colors from '../data/color';

import { useEffect, useMemo, useLayoutEffect, useState } from 'react';
import {addExpense, updateExpense} from '../store/redux/expenses';
import {useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import shortUuid from 'short-uuid';

import Subtitle from '../components/Subtitle';
import Expense from '../models/expense';
import { CATEGORIES } from '../data/dummy-data';
import AddCategory from './AddCategory';

import DropDownPicker from 'react-native-dropdown-picker';

function AddExpenseScreen({navigation, route})
{   

    const editedExpenseId = route.params?.id;
    const isEditing = useMemo(() => !!editedExpenseId, [editedExpenseId]);
    const expenses = useSelector( (state) => state.expensesList.expenses);

    const categories = useSelector( (state) => state.categoriesList.all_categories);
    const [modalVisible, setModalVisible] = useState(false);
    const [value , setValue] = useState(null);

    const [inputValues, setInputValues] = useState({
        amount: '',
        description: ''
    });

    const [openDropDown, setOpenDropDown] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            Alert.alert('Unsaved Changes', 'Press Edit or Cancel', [
                {text: 'OK'},
              ]);

        });

        const unsubscribe = navigation.addListener('blur', () => {
            navigation.setParams({ id: null });
            onResetHandler();
        });
        return unsubscribe;
      }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    
        if (editedExpenseId !== undefined) {
            const index = expenses.findIndex(expense => expense.id === editedExpenseId);
            if (index !== -1) {
                const exp = expenses[index];
                setInputValues({
                    amount: exp.amount.toString(),
                    description: exp.description,
                });
                setValue(exp.category.id); // assuming DropDownPicker expects id
            }
        } else {
            setInputValues({ amount: '', description: '' });
            setValue(null);
        }
    
    }, [navigation, route.params, expenses]);
    

    function inputChangeHandler(inputIdentifier, enteredValue)
    {
        setInputValues( (currInputValues) => {
            return {
                ...currInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    function onSubmitHandler()
    {   
        console.log("value is ", value);
        console.log("cat len is ", categories.length);
        const index = categories.findIndex(cat => cat.id === value);
        console.log("index is ", index);
        console.log("category selected is ", categories[index]);

        if(value === null || inputValues.description === '' || inputValues.amount === '')
        {
            Alert.alert(
                'Error: Field Empty',
                'Please fill in the amount, category, and remark fields.',
                [{text: 'OK',},],
              );
              return;
        }

        const serializedCat = {
            id: categories[index].id,
            title: categories[index].title,
            color: categories[index].color
        }

        let uuid = null;
        let exp = null;
        if(isEditing)
        {
            uuid = editedExpenseId;
            console.log("uuid is ", uuid);
            const index = expenses.findIndex(expense => expense.id === editedExpenseId);
            if (index !== -1) {
                const existingExp = expenses[index];
                exp = {
                    id: uuid,
                    category: serializedCat,
                    amount: parseFloat(inputValues.amount), // Ensure amount is a number
                    date: existingExp.date,
                    description: inputValues.description,
                };

                dispatch(updateExpense({expense: exp}));
                navigation.navigate('All Expenses');
            }
        }
        else
        {
            uuid = shortUuid.generate();
            console.log("uuid is ", uuid);
            // const exp = new Expense(uuid.toString(), serializedCat.id, parseFloat(amount), new Date().toISOString(), description);
            exp = {
                id: uuid.toString(),
                category: serializedCat,
                amount: parseFloat(inputValues.amount), // Ensure amount is a number
                date: new Date().toISOString(),
                description: inputValues.description,
            };

            dispatch(addExpense({expense: exp}));
        }
    }

    function onResetHandler()
    {
        setInputValues({
            amount: '',
            description: ''
        });
        setValue(null);
        setOpenDropDown(false);
    }

    let actionButton = (
        <Button title='Submit'
                onPress={onSubmitHandler}/>
    );

    let actionInstruction = (
        <Subtitle>Enter your Expense</Subtitle>
    );

    if(isEditing)
    {
        actionButton = (
            <Button title='Edit'
                    onPress={onSubmitHandler}/>
        );

        actionInstruction = (
            <Subtitle>Edit your Expense</Subtitle>
        );
    }

    return (
        <View style={styles.rootContainer}>
            {actionInstruction}
            <View style={styles.inputsContainer}>
                <View>
                    <Text>Amount</Text>
                    <TextInput  style={styles.textInputContainer}
                                keyboardType='numeric'
                                placeholder='Enter Amount'
                                onChangeText={inputChangeHandler.bind(this, 'amount')}
                                value={inputValues.amount}/>
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
                    <TextInput  style={[styles.textInputContainer, styles.remark]}
                                keyboardType='default'
                                placeholder='Remark'
                                onChangeText={inputChangeHandler.bind(this, 'description')}
                                value={inputValues.description}/>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                {actionButton}
                <Button title='Reset'
                        onPress={onResetHandler}/>
            </View>
            <View>
                {modalVisible && <AddCategory isVisible={modalVisible}
                                              setVisible={setModalVisible}/>}
            </View>
            <Button style={styles.addCategoryButtonContainer}
                    title='Add Category'
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
    },

    addCategoryButtonContainer:{
        marginTop: 30
    },

    remark:{
        minHeight: 100,
        textAlignVertical: 'top'
    }

});