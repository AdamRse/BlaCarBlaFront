import { IUser } from './user';

export interface ILoginResponse {
    access_token: string;
    token_type: string;
    user: IUser;
}