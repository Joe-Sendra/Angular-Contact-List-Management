import { Role } from './roles';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
}
