import IUser from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface UserState {
    user: IUser;
    accessToken: string,
    isLoading: boolean;
    error: string
}

const initialState: UserState = {
    user: {
        name: '',
        surName: '',
        phoneNumber: '',
        userName: '',
        email: '',
        id: -1,
        isActivated: false,
        isAdmin: false
    },
    accessToken: '',
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = '';
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    }
})

export default userSlice.reducer;

export const {
    logout,
    setUser,
    setAccessToken
} = userSlice.actions;
export const selectCurrentUser = (state: RootState) => state.userState