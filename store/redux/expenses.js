import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        expenses: []
    },
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload.expense);
        },

        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter( (expense) => expense.id !== action.payload.id);
        },

        updateExpense: (state, action) => {
            const index = state.expenses.indexOf(action.payload.id)
            state.expenses[index] = action.payload.expense;
        }
    }
});

export const addExpense = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense; 
export default expensesSlice.reducer;