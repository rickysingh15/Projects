import {View, Text, StyleSheet} from 'react-native';

import { RadioButton } from 'react-native-paper';

function PeriodRadioGroup({value, setValue})
{
    function onToggleRadioHandler(value)
    {
        setValue(value);
    };

    return (
        <RadioButton.Group onValueChange={onToggleRadioHandler}>
            <View>
                <Text style={styles.textContainer}>Period</Text>
                <RadioButton.Item label="Year"
                                  value="year"
                                  status={value === 'year' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Quarter" 
                                  value="quarter"
                                  status={value === 'quarter' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Month"
                                  value="month" 
                                  status={value === 'month' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Week" 
                                  value="week"
                                  status={value === 'week' ? 'checked' : 'unchecked'} />
                <RadioButton.Item label="Day"
                                  value="day"
                                  status={value === 'day' ? 'checked' : 'unchecked'} />
            </View>
        </RadioButton.Group>
    );
}

export default PeriodRadioGroup;

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