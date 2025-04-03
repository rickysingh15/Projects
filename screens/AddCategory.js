import {View, Text, StyleSheet, TextInput, Modal, Button, Alert} from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import shortUuid from 'short-uuid';

import Colors from '../data/color';
import { useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../store/redux/categories';

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

    function onSubmitHandler()
    {
        const index = categories.indexOf((cat) => cat.title.toLowerCase() === newCategory.toLowerCase());

        // const index = -1;
        // for(let i=0; i<categories.length; i++)
        // {
        //     if(categories[i].title.toLowerCase() === newCategory.toLowerCase())
        //     {
        //         index = i;
        //         break;
        //     }
        // }

        if(index === -1)
        {   
            const uuid = shortUuid.generate();
            // catObject = {
            //     id: uuid.toString(),
            //     title: newCategory,
            //     color: Colors.tertiary
            // }

            dispatch(addCategory({category: {
                id: uuid.toString(),
                title: newCategory,
                color: Colors.tertiary
            }}))
            setVisible(false);
            setNewCategory('');
        }
        else{
            Alert.alert('Category Already Exists', 'My Alert Msg', [
                {text: 'OK', onPress: onResetHandler},
              ]);
        }
    }

    function onResetHandler()
    {
        setNewCategory('');
    }

    return (
        <Modal visible={isVisible} animationType="slide">
            <TextInput style={styles.textInputContainer}
                       placeholder="Enter Category"
                       keyboardType='default'
                       onChangeText={setCategoryHandler}
                       value={newCategory}/>
            <Button title="Add"
                    onPress={onSubmitHandler}/>

        </Modal>
    );
}

export default AddCategory;

const styles = StyleSheet.create({
    textInputContainer:{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: Colors.secondary,
    }
});