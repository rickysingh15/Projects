import {View, Text, StyleSheet, TextInput, Modal, Button, Alert} from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import shortUuid from 'short-uuid';

import Subtitle from '../components/Subtitle';
import ErrorOverlay from '../components/ErrorOverlay';
import LoadingOverlay from '../components/LoadingOverlay';
import Colors from '../data/color';
import { useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../store/redux/categories';
import { storeCategoryDB, deleteCategoryDB } from '../utils/database';


import CategoryList from '../components/CategoryList';

function AddCategory({isVisible, setVisible})
{   
    const token = useSelector((state) => state.auth.token);
    const refToken = useSelector((state) => state.auth.refreshToken);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const categories = useSelector((state) => state.categoriesList.all_categories);
    const dispatch = useDispatch();
 
    function setCategoryHandler(cat)
    {
        console.log("category is ", cat);
        setNewCategory(cat);
    }

    async function onAddHandler()
    {
        const index = categories.findIndex((cat) => cat.title.toLowerCase() === newCategory.toLowerCase());
        
        if(index === -1)
        {   
            // const uuid = shortUuid.generate();
            setIsUpdating(true);
            try{

                const id = await storeCategoryDB(token, {title: newCategory});
                dispatch(addCategory({category: {
                    id: id,
                    title: newCategory
                }}));
            }
            catch(error)
            {
                if(error.response.status === 401)
                {
                    const {newIdToken, newRefreshToken} = await refresh(refToken);
                    dispatch(reauthenticateUser(newIdToken, newRefreshToken));
                }
                else
                {
                    console.log("error is ", error);
                    setError(error.message);
                }
            }
            finally
            {
                setIsUpdating(false);
                setVisible(false);
                setNewCategory('');
            }
            
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

    if(isUpdating)
    {
        return <LoadingOverlay message='Adding Category...'/>
    }

    if(error)
    {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
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