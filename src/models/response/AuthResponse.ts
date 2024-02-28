import IUser from "../IUser";

export interface AuthResponse{
    user: IUser
    refreshToken: string,
    accessToken: string
}