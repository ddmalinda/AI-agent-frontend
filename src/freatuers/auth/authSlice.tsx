import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface AuthState {
    token: string | null;
    refreshToken:string | null;
    userId: number | null;
    email:string | null;
    firstName: string | null;
    lastName: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    refreshToken:null,
    userId: null,
    email:null,
    firstName: null,
    lastName: null,
    isAuthenticated: false,

};
type authData={
    token: string,
    refreshToken:string,
    userId: number ,
    email:string,
    firstName: string ,
    lastName: string ,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ authData: authData }>) => {
            console.log(action.payload)
            const { authData } = action.payload;
            state.token = authData.token;
            state.refreshToken =authData.refreshToken;
            state.userId= authData.userId;
            state.email=authData.email;
            state.firstName=authData.firstName;
            state.lastName=authData.lastName;
            state.isAuthenticated = true;
        },
        logOut: (state) => {
             state.token = null;
            state.refreshToken = null;
            state.userId = null;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.isAuthenticated = false;
        },
    }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;