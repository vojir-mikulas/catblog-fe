import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user-slice";


const store = configureStore({
    reducer:{
     user: userSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>;
export const userState = (state: RootState) => state.user;

export default store

