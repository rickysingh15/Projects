import 'react-native-get-random-values';

import {View, Text, Button, StyleSheet, TextInput, Modal, Alert} from 'react-native';
import Colors from '../data/color';

import { useEffect, useMemo, useLayoutEffect, useState } from 'react';
import {addExpense, updateExpense} from '../store/redux/expenses';
import {useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import { storeExpense, updateExpenseDB } from '../utils/database';
import shortUuid from 'short-uuid';

import Subtitle from '../components/Subtitle';
import AddCategory from './AddCategory';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

import { InputValidators } from '../utils/InputValidators';

import DropDownPicker from 'react-native-dropdown-picker';

function AddExpenseScreen({navigation, route})
{   
    const token = useSelector(state => state.auth.token);
    const [isUpdating, setIsUpdating] = useState(false);
    const editedExpenseId = route.params?.id;
    const isEditing = useMemo(() => !!editedExpenseId, [editedExpenseId]);
    const expenses = useSelector( (state) => state.expensesList.expenses);

    const categories = useSelector( (state) => state.categoriesList.all_categories);
    const [modalVisible, setModalVisible] = useState(false);
    const [value , setValue] = useState(null);
    const [inputs, setInputs] = useState({
        amount: {value:'', isValid: true},
        description: {value: '', isValid: true}
    });

    const [openDropDown, setOpenDropDown] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
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
                setInputs({
                    amount: {value: exp.amount.toString(), isValid: true}, 
                    description: {value: exp.description, isValid: true},
                });
                setValue(exp.category.id); // assuming DropDownPicker expects id
            }
        } else {
            setInputs({ amount: {value: '', isValid: true}, description: {value: '', isValid: true} });
            setValue(null);
        }
    
    }, [navigation, route.params, expenses]);
    

    function inputChangeHandler(inputIdentifier, enteredValue)
    {
        setInputs( (currInputs) => {
            return {
                ...currInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            };
        });
    }

    async function onSubmitHandler()
    {   
        console.log("value is ", value);
        console.log("cat len is ", categories.length);
        const index = categories.findIndex(cat => cat.id === value);
        console.log("index is ", index);
        console.log("category selected is ", categories[index]);

        if(value === null || inputs.description.value === '' || inputs.amount.value === '')
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

        const [amountIsValid, descriptionIsValid] = InputValidators(inputs.amount.value,inputs.description.value);

        setInputs((currInputs) => {
            return {
                amount: {value: currInputs.amount.value, isValid: amountIsValid},
                description: {value: currInputs.description.value, isValid: descriptionIsValid},
            };
        });

        if(!amountIsValid || !descriptionIsValid)
        {
            return;   
        }

        setIsUpdating(true);
        if(isEditing)
        {
            uuid = editedExpenseId;
            console.log("uuid is ", uuid);
            const index = expenses.findIndex(expense => expense.id === editedExpenseId);
            if (index !== -1) {
                const existingExp = expenses[index];
                exp = {
                    category: serializedCat,
                    amount: parseFloat(inputs.amount.value), // Ensure amount is a number
                    date: existingExp.date,
                    description: inputs.description.value,
                };

                try{
                    await updateExpenseDB(token, uuid, exp);
                    exp = {...exp, id: uuid};
                    dispatch(updateExpense({expense: exp}));
                    navigation.navigate('Expenses');
                }
                catch(error){
                    setError(error.message);
                    setIsUpdating(false);
                }
            }
        }
        else
        {
            uuid = shortUuid.generate();  //not used instead using Firebases unique id
            console.log("uuid is ", uuid); 
            // const exp = new Expense(uuid.toString(), serializedCat.id, parseFloat(amount), new Date().toISOString(), description);
            exp = {
                category: serializedCat,
                amount: parseFloat(inputs.amount.value), // Ensure amount is a number
                date: new Date().toISOString(),
                description: inputs.description.value,
            };

            
            try{
                const id = await storeExpense(token, exp);
                exp = {...exp, id: id}; // Add the generated ID to the expense object
                dispatch(addExpense({expense: exp}));
                navigation.navigate('Expenses');
            }
            catch(error){
                setError(error.message);
                setIsUpdating(false);
            }
        }
    }

    function onResetHandler()
    {
        setInputs({
            amount: {value: '', isValid: true},
            description: {value: '', isValid: true}
        });
        setValue(null);
        setOpenDropDown(false);
    }

    function onCancelHandler()
    {
        navigation.navigate('Expenses');
    }

    if(isUpdating)
    {
        return <LoadingOverlay message='Updating Expense...'/>
    }

    if(error && !isUpdating)
    {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
    }

    let actionButton = (
        <Button title='Submit'
                onPress={onSubmitHandler}/>
    );

    let actionInstruction = (
        <Subtitle>Enter your Expense</Subtitle>
    );

    let resetOrCanelButton = (
        <Button title='Reset'
            onPress={onResetHandler}/>
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

        resetOrCanelButton = (
            <Button title='Cancel'
                    onPress={onCancelHandler}/>
        );
    }

    const isFormValid = !inputs.amount.isValid || !inputs.description.isValid;

    return (
        <View style={styles.rootContainer}>
            {actionInstruction}
            <View style={styles.inputsContainer}>
                <View>
                    <Text style={[!inputs.amount.isValid && styles.invalidLabel]}>Amount</Text>
                    <TextInput  style={[styles.textInputContainer, !inputs.amount.isValid && styles.invalidInput]}
                                keyboardType='numeric'
                                placeholder='Enter Amount'
                                onChangeText={inputChangeHandler.bind(this, 'amount')}
                                value={inputs.amount.value}/>
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
                    <Text style={[!inputs.description.isValid && styles.invalidLabel]}>Remarks</Text>
                    <TextInput  style={[styles.textInputContainer, styles.remark, !inputs.description.isValid && styles.invalidInput]}
                                keyboardType='default'
                                placeholder='Remark'
                                onChangeText={inputChangeHandler.bind(this, 'description')}
                                value={inputs.description.value}/>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                {actionButton}
                {resetOrCanelButton}
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
    },

    invalidLabel: {
        color: Colors.errorPrimary,
    },

    invalidInput:{
        backgroundColor: Colors.errorSecondary,
    }

});