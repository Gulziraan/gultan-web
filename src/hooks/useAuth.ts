import {useAppDispatch, useAppSelector} from "./redux";
import {useMemo} from "react";
import {selectCurrentUser, setAccessToken} from "../store/reducers/userSlice";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser)
    if(!user.accessToken){
        const token = localStorage.getItem("accessToken")
        dispatch(setAccessToken(token!))
    }

    return useMemo(() => ({ user }), [user])
}