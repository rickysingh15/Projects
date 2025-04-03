import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import ExpenseDetailScreen from './screens/ExpenseDetailScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { store } from './store/redux/store';
import { Provider } from 'react-redux';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function StackNavigator()
{
	return (
		<Stack.Navigator>
			<Stack.Screen name="All_Expenses"
						  component={AllExpenseScreen}
						  options={{
							headerShown: true,
						  }}/>

			<Stack.Screen name="ExpenseDetailOverview"
						  component={ExpenseDetailScreen}/>
		</Stack.Navigator>
	);
}

export default function App() 
{
	return (
		<>
			<StatusBar style="auto"/>
			<Provider store={store}>
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
										component={StackNavigator}
										options={{

											headerShown: false,
											tabBarIcon: (color, size) => 
												<Ionicons name="list" size={size} color={color}/>,
										}} />
					</BottomTab.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	); 
}

const styles = StyleSheet.create({
	text:{
		color: 'red'
	}
});
