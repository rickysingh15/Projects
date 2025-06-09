import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "Auth",
    initialState:{
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        email: null
    },
    reducers: {
        authenticate: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.email = action.payload.email;
        },

        logout: (state, action) => {
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.email = null;
        }
    }
});

export const authenticate = loginSlice.actions.authenticate;
export const logout = loginSlice.actions.logout;
export default loginSlice.reducer;