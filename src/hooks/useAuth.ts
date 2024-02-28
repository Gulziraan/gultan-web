import {useAppDispatch, useAppSelector} from "./redux";
import {useMemo} from "react";
import {selectCurrentUser, setAccessToken, setUser} from "../store/reducers/userSlice";
import {userApi} from "../store/api/userApi";
import IUser from "../models/IUser";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser)
    if(!user.accessToken){
        const token = localStorage.getItem("accessToken")
        dispatch(setAccessToken(token!))
    }
    console.log(user)

    return useMemo(() => ({ user }), [user])
}