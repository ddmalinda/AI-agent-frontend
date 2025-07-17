import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../freatuers/auth/authSlice";

export const store = configureStore({
    reducer: {
       auth: authReducer,
    }
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type for future use with useDispatch
export type AppDispatch = typeof store.dispatch;