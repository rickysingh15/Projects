import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';


export default function App() 
{

	return (
		<>
			<StatusBar style="light"/>
			<Text>Hello There!</Text>
		</>
	); 
}

const styles = StyleSheet.create({
	text:{
		color: 'red'
	}
});
