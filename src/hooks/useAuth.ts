import {useAppSelector} from "./redux";
import {useMemo} from "react";
import {selectCurrentUser} from "../store/reducers/userSlice";

export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser)

    return useMemo(() => ({ user }), [user])
}