import {View, Text, StyleSheet, Button} from 'react-native';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/redux/AuthActions';
import FlatButton from '../components/FlatButton';

import axios from 'axios';

function ProfileScreen({navigation, route})
{   
    const token = useSelector(state => state.auth.token);
    console.log("Token: ", token);
    const [fetchedMessage, setFetchedMessage] = useState(null);
    const email = useSelector(state => state.auth.email);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://expense-tracker-aa8b1-default-rtdb.firebaseio.com/message.json?auth="+token).then((response) => {
            console.log(response.data);
            setFetchedMessage(response.data);
        });
    }, [token]);

    useLayoutEffect( () => {
        navigation.setOptions({
            title: 'Profile',
            headerRight: () => {return <FlatButton onPress={onLogoutHandler}>Logout</FlatButton>}
        });
    }, [navigation]);

    function onLogoutHandler()
    {
        dispatch(logoutUser());
    }

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.mainText}> {fetchedMessage} </Text>
            <Text style={styles.text}> {email} </Text>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({});