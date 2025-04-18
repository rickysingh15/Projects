import {View, Text, StyleSheet} from 'react-native';

import { RadioButton } from 'react-native-paper';

function OperationRadioGroup({value, setValue})
{
    function onToggleRadioHandler(value)
    {
        setValue(value);
    };

    return (
        <RadioButton.Group onValueChange={onToggleRadioHandler}>
            <View>
                <Text style={styles.textContainer}>Operation</Text>
                <RadioButton.Item label="Max"
                                  value="max"
                                  status={value === 'max' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Min"
                                  value="min"
                                  status={value === 'min' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Sum"
                                  value="sum"
                                  status={value === 'sum' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Average"
                                  value="average"
                                 status={value === 'average' ? 'checked' : 'unchecked'} />
            </View>
        </RadioButton.Group>
    );
}

export default OperationRadioGroup;

const styles = StyleSheet.create({
    contentContainer:{
        flexDirection: "column",
        alignItems: "center",
    },

    textContainer:{
        fontWeight: "bold",
        alignSelf: "center",
    },
});