import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfigUser = {
    key: 'user',
    storage,
}
const userReducer = persistReducer(persistConfigUser,userSlice.reducer)

const store = configureStore({
    reducer:{
     user: userReducer
    }
})

type RootState = ReturnType<typeof store.getState>;
export const userState = (state: RootState) => state.user;

export let persistor = persistStore(store)
export default store

