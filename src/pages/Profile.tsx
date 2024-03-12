import {object, string} from "zod";
import {userApi} from "../store/api/userApi.ts";
import {useEffect} from "react";
import {setAccessToken, setUser} from "../store/reducers/userSlice.ts";
import {toast} from "react-toastify";


const profileSchema = object({
    name: string(),
    surName: string(),
    phoneNumber: string()
});
const Profile = () => {
    const [getMe, {isLoading, isError, error, isSuccess, data}] =
        userApi.useGetMeMutation();

    useEffect(() => {
        if (isSuccess) {

        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div>

        </div>
    );
};

export default Profile;