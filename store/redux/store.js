import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import expensesReducer from "./expenses";
import categoriesReducer from "./categories";
import authReducer from "./auth";

export const store = configureStore({
    reducer: {
        expensesList: expensesReducer,
        categoriesList: categoriesReducer,
        auth: authReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});