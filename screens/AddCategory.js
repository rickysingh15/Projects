import {View, Text, StyleSheet, TextInput, Modal, Button, Alert} from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import shortUuid from 'short-uuid';

import Subtitle from '../components/Subtitle';
import Colors from '../data/color';
import { useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../store/redux/categories';

import CategoryList from '../components/CategoryList';

function AddCategory({isVisible, setVisible})
{
    const [newCategory, setNewCategory] = useState('');
    const categories = useSelector((state) => state.categoriesList.all_categories);
    const dispatch = useDispatch();
 
    function setCategoryHandler(cat)
    {
        console.log("category is ", cat);
        setNewCategory(cat);
    }

    function onAddHandler()
    {
        const index = categories.findIndex((cat) => cat.title.toLowerCase() === newCategory.toLowerCase());

        if(index === -1)
        {   
            const uuid = shortUuid.generate();
            dispatch(addCategory({category: {
                id: uuid.toString(),
                title: newCategory
            }}))
            setVisible(false);
            setNewCategory('');
        }
        else{
            Alert.alert('Category Already Exists', 'Enter a new category', [
                {text: 'OK', onPress: onResetHandler},
              ]);
        }
    }

    function onDoneHandler()
    {
        setVisible(false);

    }

    function onResetHandler()
    {
        setNewCategory('');
    }

    return (
        <Modal visible={isVisible}
               animationType="slide"
               style={styles.modal}>
            <View style={styles.rootContainer}>
                <TextInput style={styles.textInputContainer}
                            placeholder="Enter Category"
                            keyboardType='default'
                            onChangeText={setCategoryHandler}
                            value={newCategory}/>

                <View style={styles.buttonsContainer}>
                    <Button title="Add"
                            onPress={onAddHandler}
                            style={styles.button}/>
                    <Button title="Done"
                            onPress={onDoneHandler}
                            style={styles.button}/>
                </View>
                <Subtitle>Categories</Subtitle>
                <CategoryList list={categories}/>
            </View>
        </Modal>
    );
}

export default AddCategory;

const styles = StyleSheet.create({

    modal:{
        // flex: 1
    },  

    rootContainer: {
        flex: 1,
        margin: 16,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // marginHorizontal: 12,
        marginTop: '20%',
        padding: 8,
    },

    textInputContainer:{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.secondary,
    },

    buttonsContainer:{
        padding: 8,
        margin: 8,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button:{
        margin: 8,
        padding: 8,
        borderWidth: 1.5,
        borderColor: Colors.secondary,
    },

    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.secondary,
    }

});