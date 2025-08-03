import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { tokenUtils } from "../../util/tokenUtils";
import { userDataUtils } from "../../util/userDataUtils";


//Props Types
interface AuthState {
    userId: number | null;
    email:string | null;
    firstName: string | null;
    lastName: string | null;
    isAuthenticated: boolean;
}

type authData={
    userId: number ,
    email:string,
    firstName: string ,
    lastName: string ,
}

const initialState: AuthState =  {
    userId: null,
    email:null,
    firstName: null,
    lastName: null,
    isAuthenticated: false,

};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ authData: authData }>) => {
            const { authData } = action.payload;
            state.userId= authData.userId;
            state.email=authData.email;
            state.firstName=authData.firstName;
            state.lastName=authData.lastName;
            state.isAuthenticated = true;

        },
        logout: (state) => {
             
            state.userId = null;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.isAuthenticated = false;
            tokenUtils.removeToken();
            userDataUtils.removeUserData();
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;