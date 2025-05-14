import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "Auth",
    initialState:{
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        authenticate: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        logout: (state, action) => {
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const authenticate = loginSlice.actions.authenticate;
export const logout = loginSlice.actions.logout;
export default loginSlice.reducer;