import { createSlice } from "@reduxjs/toolkit";

const init = [{
    id: 'a1',
    category: 'Food',
    amount: 100, // Ensure amount is a number
    date: new Date('2024-01-01').toISOString(),
    description: 'Grocery shopping'
}, {
    id: 'a2',
    category: 'Entertainment',
    amount: 200, // Ensure amount is a number
    date: new Date('2024-02-01').toISOString(),
    description: 'Movie tickets'
}, {
    id: 'a3',
    category: 'Groceries',
    amount: 300, // Ensure amount is a number
    date: new Date('2024-03-01').toISOString(),
    description: 'Grocery shopping'
}];


const expensesSlice = createSlice({
    name: "expensesCache",
    initialState: {
        expenses: init
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