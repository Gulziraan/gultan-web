export default interface IUser {
    name: string,
    surname: string,
    phoneNumber: string,
    userName?: string,
    email?: string,
    isActivated?: boolean,
    id?: number,
    isAdmin?: boolean
}