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

    return (
        <View>
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

});