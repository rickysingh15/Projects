import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: "categoriesCache",
    initialState: {
        all_categories: []
    },
    reducers:{
        addCategory: (state, action) => {
            state.all_categories.push(action.payload.category);
        },

        removeCategory: (state, action) => {
            console.log("inside removeCategory reducer");
            state.all_categories = state.all_categories.filter( (cat) => cat.id !== action.payload.id)
            console.log("new state is ", state.all_categories);
        },

        setCategories: (state, action) => {
            state.all_categories = action.payload.categories;
        }
    }
});

export const addCategory = categoriesSlice.actions.addCategory;
export const removeCategory = categoriesSlice.actions.removeCategory;
export const setCategories = categoriesSlice.actions.setCategories;
export default categoriesSlice.reducer;