import {View, StyleSheet, Text, Button} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/redux/auth';
import { loginUser } from '../store/redux/AuthActions';

import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/Auth';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Title } from 'react-native-paper';

function LoginScreen({navigation, route})
{
    const [isLogging, setisLogging] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // useLayoutEffect( () => {
    //     navigation.setOptions({
    //         title: 'Login',
    //     });
    // }, [navigation]);
    
    async function onAuthenticateHandler({ email, password })
    {   
        console.log("onAuth called")
        setisLogging(true);
        try{
            const {token, refreshToken} = await login(email, password);
            dispatch(loginUser(token, email, refreshToken));
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