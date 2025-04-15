import {View, Text, StyleSheet, FlatList} from 'react-native';

import CategoryGridTile from './GridTiles/CategoryGridTile';

function CategoryList({list})
{
    function renderCategoryGridItem(itemData)
    {
        const item = itemData.item;
        const categoryItemProps = {
            id: item.id,
            title: item.title,
            color: item.color
        }

        return (
            <CategoryGridTile {...categoryItemProps}/>
        );
    }

    return (
        <View>
            <FlatList
            data={list}
            renderItem={renderCategoryGridItem}
            keyExtractor={(item) => {return item.id}}
            alwaysBounceVertical={false}/>
        </View>
    );
}

export default CategoryList;

const styles = StyleSheet.create({});   