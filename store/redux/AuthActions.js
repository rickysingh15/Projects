// store/authActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, logout } from "./auth";

export const loginUser = (token, email) => async (dispatch) => {
	try {
		console.log("inside loginUser action with token", token, " and email", email);
		await AsyncStorage.setItem("AuthToken", token);
		await AsyncStorage.setItem("AuthEmail", email);
		dispatch(authenticate({ token: token, email: email }));
	} catch (err) {
		console.error("Login error:", err);
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		await AsyncStorage.removeItem("AuthToken");
		await AsyncStorage.removeItem("AuthEmail");
		dispatch(logout());
	} catch (err) {
		console.error("Logout error:", err);
	}
};

export const checkStoredAuth = () => async (dispatch) => {
	try {
		const token = await AsyncStorage.getItem("AuthToken");
		const email = await AsyncStorage.getItem("AuthEmail");

		if (token) {
			dispatch(authenticate({ token, email }));
		}
	} catch (err) {
		console.error("Error checking stored auth:", err);
	}
};
