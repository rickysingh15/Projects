import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from "./expenses";
import categoriesReducer from "./categories";

export const store = configureStore({
    reducer: {
        expensesList: expensesReducer,
        categoriesList: categoriesReducer
    }
});