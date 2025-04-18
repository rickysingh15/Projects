import {View, Text, StyleSheet, FlatList} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ExpenseGridTile from './GridTiles/ExpenseGridTile';

function ExpenseList({list})
{
    const navigation = useNavigation();
    function renderExpenseGridItem(itemData)
    {
        const item = itemData.item;
        const expenseItemProps = {
            id: item.id,
            category: item.category,
            amount: item.amount,
            date: item.date,
            description: item.description
        }
        function ExpenseGridOnPressHandler()
        {
            navigation.navigate('ExpenseDetailOverview', {ExpenseId: itemData.item.id,
                                                           ExpCategory: itemData.item.category,
                                                              ExpAmount: itemData.item.amount,
                                                              ExpDate: itemData.item.date,
                                                              ExpDescription: itemData.item.description
            });
        }

        return (
            <ExpenseGridTile {...expenseItemProps}
                          onPress={ExpenseGridOnPressHandler}/>
        );
    }

    if(list.length === 0)
    {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.noExpensesText}>No expenses found</Text>
            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
            data={list}
            renderItem={renderExpenseGridItem}
            keyExtractor={(item) => {return item.id}}
            alwaysBounceVertical={false}/>
        </View>
    );
}

export default ExpenseList;

const styles =  StyleSheet.create({
    listContainer:{
        marginBottom: 60,
    },

    noExpensesText:{
        textAlign: 'center',
        fontSize: 20,
        margin: 24,
    }
});