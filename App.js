import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import { useState } from 'react';

import CategoryListScreen from './screens/CategoryListScreen';
import MealsListScreen from './screens/MealsListScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { CATEGORIES } from './data/dummy-data';
import FavouritesScreen from './screens/FavouritesScreen';
// import FavouritesContextProvider from './store/context/favourites-context';

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNavigator() 
{
	return (
		<Drawer.Navigator screenOptions={
			{
				headerStyle: {backgroundColor: "#351401"},
				headerTintColor: "white",
				contentStyle: {backgroundColor: "#3f2f25"},
				drawerContentStyle: {backgroundColor: "#3f2f25"},
				drawerInactiveTintColor: "white",
				drawerActiveTintColor: "#351401",
				drawerActiveBackgroundColor: "#c9a68f",
			}
		}>
			<Drawer.Screen name="MealsCategories" component={CategoryListScreen}
							options={{
								title: "All Categories",
								drawerIcon: ({color, size}) => <Ionicons name="list" 
																		 color={color}
																		 size={size}/>
							}}/>
			<Drawer.Screen name="Favourites" component={FavouritesScreen}
							options={{

								drawerIcon: ({color, size}) => <Ionicons name="star" 
																		 color={color} 
																		 size={size}/> 
							}}/>
		</Drawer.Navigator>
	);
}

export default function App() 
{

	return (
		<>
			<StatusBar style="light"/>
			{/* <FavouritesContextProvider> */}
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={
						{
							headerStyle: {backgroundColor: "#351401"},
							headerTintColor: "white",
							contentStyle:{backgroundColor: "#362626"}
						}
					}
					>
						<Stack.Screen name="Drawer"
													component={DrawerNavigator}
													options={
														{
															headerShown: false
														}}
													/>
						<Stack.Screen name="MealsOverview" 
													component={MealsListScreen}
													/>
						<Stack.Screen name="MealDetailOverview"
													component={MealDetailScreen}
													options={{
														title: "About the Meal"
													}}/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
			{/* </FavouritesContextProvider> */}
		</>
	); 
}

const styles = StyleSheet.create({
	text:{
		color: 'red'
	}
});
