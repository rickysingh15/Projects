import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
    name: "expensesCache",
    initialState: {
        expenses: []
    },
    reducers: {
        addExpense: (state, action) => {
            state.expenses.unshift(action.payload.expense); //adds new expense inplace
            //O(n) time complexity
        },  

        removeExpense: (state, action) => {
            state.expenses = state.expenses.filter( (expense) => expense.id !== action.payload.id);
        },

        updateExpense: (state, action) => {
            const index = state.expenses.findIndex((expense) => expense.id === action.payload.expense.id);
            if (index !== -1) {
                state.expenses[index] = action.payload.expense;
            }
        },

        setExpenses: (state, action) => {
            state.expenses = action.payload;
        }
    }
});

export const addExpense = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense; 
export const setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;