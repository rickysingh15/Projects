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
            state.all_categories.filter( (cat) => cat.id !== action.payload.category.id)
        }
    }
});

export const addCategory = categoriesSlice.actions.addCategory;
export const removeCategory = categoriesSlice.actions.removeCategory;
export default categoriesSlice.reducer;