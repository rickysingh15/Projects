import {View, StyleSheet, Text, Button} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/redux/auth';

import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/Auth';

function LoginScreen()
{
    const [isLogging, setisLogging] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    async function onAuthenticateHandler({ email, password })
    {   
        console.log("onAuth called")
        setisLogging(true);
        try{
            const token = await login(email, password);
            dispatch(authenticate({token: token}));
        }
        catch (error)
        {
            setError(error.message);
            setisLogging(false);
            return;
        }
        setisLogging(false);
    }

    if(isLogging)
    {
        return (
            <LoadingOverlay message="Logging User..."/>
        );
    }

    if(error && !isLogging)
    {
        return (
            <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
        );
    }

    return (
        <View style={styles.container}>
            <AuthContent isLogin={true}
                         onAuthenticate={onAuthenticateHandler}/>
        </View>
    );

    
}

export default LoginScreen;

const styles = StyleSheet.create({});