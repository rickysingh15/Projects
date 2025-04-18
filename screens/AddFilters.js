import {View, Text, StyleSheet, Modal, TextInput, Button} from 'react-native';

import {useState} from 'react';

import Colors from '../data/color';
import Subtitle from '../components/Subtitle';
import PeriodRadioGroup from '../components/RadioGroups/PeriodRadioGroup';
import OperationRadioGroup from '../components/RadioGroups/OperationRadioGroup';

function AddFilters({isVisible, setVisible, period, duration, operation, setPeriod, setDuration, setOperation})
{
    function setDurationHandler(value)
    {
        setDuration(Number(value));
    }

    function clearFiltersHandler()
    {
        setDuration(0);
        setPeriod('');
        setOperation('');
    }

    return (
        <Modal visible={isVisible}
               animationType="slide"
               style={styles.modal}>
            <View style={styles.rootContainer}>
                <Subtitle>Filters</Subtitle>
                <View>
                    <Text style={styles.durationTextContainer}>Duration</Text>
                    <TextInput  style={styles.textInputContainer}
                                keyboardType='numeric'
                                placeholder='Enter Duration'
                                onChangeText={setDurationHandler}
                                value={duration ? duration.toString() : ''}/>
                </View>
                <View style={styles.radioGroupsContainer}>
                    <PeriodRadioGroup value={period}
                                       setValue={setPeriod}/>
                    <OperationRadioGroup value={operation}
                                          setValue={setOperation}/>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button style={styles.button}
                            title="Reset"
                            onPress={clearFiltersHandler}/>
                    <Button style={styles.button}
                            title="Done"
                            onPress={() => setVisible(false)}/>

                </View>
            </View>
        </Modal>
    );
}

export default AddFilters;

const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        padding: 14,
    },

    radioGroupsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },

    durationTextContainer:{
        fontWeight: "bold",
        alignSelf: "center",
    },

    filterPreviewText:{
        fontWeight: "bold",
        alignSelf: "center",
        margin: 10,
    },  

    textInputContainer:{
        borderRadius: 5,
        borderWidth: 1.5,
        width: "40%",
        alignSelf: "center",
        borderColor: Colors.secondary,
    },

    button:{
        width: "40%",
    },

    buttonsContainer:{
        padding: 8,
        margin: 8,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
    },
});