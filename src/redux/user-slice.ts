import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
}

interface userSliceState {
    user: User | null
}

const initialState: userSliceState = {
     user: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginUser(state,action : PayloadAction<User>){
        const currentUser: User = action.payload;
        state.user = {
            ...currentUser
        }
        },
        logoutUser(state,action){
        state.user = null
        }
    }
})


export const {loginUser,logoutUser} = userSlice.actions;
export default userSlice;