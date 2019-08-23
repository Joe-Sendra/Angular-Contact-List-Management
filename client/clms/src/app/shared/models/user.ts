import { Role } from './roles';

export interface IUser {
    username: string;
    password: string;
    role: Role;
    login: {
        status: boolean;
    };
}
