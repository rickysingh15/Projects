import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

import { Platform } from 'react-native';
import { useState } from 'react';

import Colors from './data/color';

import HomeScreen from './screens/HomeScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import AllExpenseScreen from './screens/AllExpenseScreen';
import ExpenseDetailScreen from './screens/ExpenseDetailScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthStartup from './components/Auth/AuthStartup';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { store } from './store/redux/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function AuthenticatedStackNavigator()
{
	return (
		<Stack.Navigator screenOptions={{
			headerStyle: {backgroundColor: Colors.tertiary},
			headerTintColor: 'white',
		}}>
			<Stack.Screen name="Expenses"
						  component={AllExpenseScreen}
						  options={{
							headerShown: true,
						  }}/>

			<Stack.Screen name="Add Expense"
						  component={AddExpenseScreen}/>

			<Stack.Screen name="ExpenseDetailOverview"
						  component={ExpenseDetailScreen}/>
		</Stack.Navigator>
	);
}

function AuthenticatedBottomTabNavigator()
{
	return (
		<BottomTab.Navigator screenOptions={
			{
				headerStyle: {backgroundColor: Colors.tertiary},
				headerTintColor: 'white',
				tabBarStyle: {backgroundColor: Colors.tertiary},
				tabBarActiveTintColor: 'white',
			}
		}>
			<BottomTab.Screen name="Ledger" 
							component={ProfileScreen}
							options={{
								tabBarIcon: (color, size) => 
									<Ionicons name="person" size={size+5} color={color} />,
							}} />
			<BottomTab.Screen name="All Expenses" 
							component={AuthenticatedStackNavigator}
							options={{

								headerShown: false,
								tabBarIcon: (color, size) => 
									<Ionicons name="calendar" size={size+5} color={color}/>,
							}} />
		</BottomTab.Navigator>
	);
}

function UnAuthenticatedStackNavigator()
{
	return (
		<Stack.Navigator screenOptions={{
			headerStyle: {backgroundColor: Colors.tertiary},
			headerTintColor: 'white',
		}}>
			<Stack.Screen name="Home" 
						  component={HomeScreen}
						  options={{
						  }}/>

			<Stack.Screen name="Login"
						  component={LoginScreen}
						  options={{
						  }}/>

			<Stack.Screen name="Sign Up"
						  component={SignUpScreen}
						  options={{
						  }}/>
		</Stack.Navigator>	
	);
}

function MainNavigation()
{
	const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
	const [isTryingAutoLogin, setIsTryingAutoLogin] = useState(true);

	let startup = (<AuthStartup isTryingAutoLogin={isTryingAutoLogin}
								setIsTryingAutoLogin={setIsTryingAutoLogin}/>);
	let navigationContainers = (
		<NavigationContainer>
			{isLoggedIn && <AuthenticatedBottomTabNavigator/>}
			{!isLoggedIn && <UnAuthenticatedStackNavigator/>}
		</NavigationContainer>);

	return (isTryingAutoLogin ? startup : navigationContainers);
}

export default function App() 
{
	return (
		<>
			{/* <SafeAreaProvider> */}
				<StatusBar backgroundColor={Colors.tertiary} style="light" translucent={false} />
				<Provider store={store}>
					<MainNavigation/>
				</Provider>
			{/* </SafeAreaProvider> */}
		</>
	); 
}

const styles = StyleSheet.create({
	text:{
		color: 'red'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
});
