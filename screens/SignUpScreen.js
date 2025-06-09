import {View, StyleSheet, Text, Button} from 'react-native';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/redux/auth';
import { useLayoutEffect } from 'react';

import { createUser } from '../utils/Auth';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

function SignUpScreen({navigation, route})
{   
    const [isCreating, setisCreating] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // useLayoutEffect( () => {
    //         navigation.setOptions({
    //             title: 'Become a member',
    //         });
    //     }, [navigation]);

    async function onAuthenticateHandler({ email, password })
    {   
        console.log("onAuth called")
        setisCreating(true);
        try{
            const {token, refreshToken} = await createUser(email, password);
            dispatch(authenticate({token: token, email: email, refreshToken: refreshToken}));
        }
        catch (error)
        {
            setError(error.message);
            setisCreating(false);
            return;
        }
        setisCreating(false);
        console.log("response is ", response)
    }

    if(isCreating)
    {
        return (
            <LoadingOverlay message="Creating User..."/>
        );
    }

    if(error && !isCreating)
    {
        return (
            <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
        );
    }

    return (
        <View style={styles.container}>
            <AuthContent onAuthenticate={onAuthenticateHandler}/>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({});