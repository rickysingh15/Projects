import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();


export default function App() 
{

	return (
		<>
			<StatusBar style="light"/>
			<NavigationContainer>
				<BottomTab.Navigator>
					<BottomTab.Screen name="Home" 
									  component={HomeScreen}
									  options={{
										tabBarIcon: (color, size) => 
											<Ionicons name="home" size={size} color={color} />,
									  }} />
					<BottomTab.Screen name="Add Expense" 
					                  component={AddExpenseScreen}
									  options={{
										tabBarIcon: (color, size) =>
											<Ionicons name="add" size={size} color={color}/>,
									  }} />
					<BottomTab.Screen name="All Expenses" 
									  component={AllExpenseScreen}
									  options={{
										tabBarIcon: (color, size) => 
											<Ionicons name="list" size={size} color={color}/>,
									  }} />
				</BottomTab.Navigator>
			</NavigationContainer>
		</>
	); 
}

const styles = StyleSheet.create({
	text:{
		color: 'red'
	}
});
