// store/authActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, logout } from "./auth";

export const loginUser = (token, email, refreshToken) => async (dispatch) => {
	try {
		console.log("inside loginUser action with token", token, " and email", email);
		await AsyncStorage.setItem("AuthToken", token);
		await AsyncStorage.setItem("AuthEmail", email);
		await AsyncStorage.setItem("AuthRefreshToken", refreshToken);
		dispatch(authenticate({ token: token, email: email, refreshToken: refreshToken }));
	} catch (err) {
		console.error("Login error:", err);
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		await AsyncStorage.removeItem("AuthToken");
		await AsyncStorage.removeItem("AuthEmail");
		await AsyncStorage.removeItem("AuthRefreshToken");
		dispatch(logout());
	} catch (err) {
		console.error("Logout error:", err);
	}
};

export const checkStoredAuth = () => async (dispatch) => {
	try {
		const token = await AsyncStorage.getItem("AuthToken");
		const email = await AsyncStorage.getItem("AuthEmail");
		const refreshToken = await AsyncStorage.getItem("AuthRefreshToken");

		if (token) {
			// dispatch(authenticate({ token, email, refreshToken }));
			dispatch(authenticate({ token: token, email: email, refreshToken: refreshToken }));
		}
	} catch (err) {
		console.error("Error checking stored auth:", err);
		return;
	}
};

export const reauthenticateUser = (newIdToken, newRefreshToken) => async (dispatch) => {
	try {
		await AsyncStorage.setItem("AuthToken", newIdToken);
		await AsyncStorage.setItem("AuthRefreshToken", newRefreshToken);
		const email = await AsyncStorage.getItem("AuthEmail");
		dispatch(authenticate({ token: newIdToken, refreshToken: newRefreshToken, email: email }));
	} catch (err) {
		console.error("Reauthentication error:", err);
	}
};
