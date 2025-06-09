// store/authActions.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addCategory, removeCategory } from "./categories";

export const storeCategoryAction = (token, categoryData) => async (dispatch) => {
	try {

        dispatch(addCategory({ category: categoryData }));
		
		await AsyncStorage.setItem("AuthToken", token);
		await AsyncStorage.setItem("AuthEmail", email);
		await AsyncStorage.setItem("AuthRefreshToken", refreshToken);
		
	} catch (err) {
		console.error("Login error:", err);
	}
};