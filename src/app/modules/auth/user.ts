import { Role } from './role';

export class User {
    email: string;
    fullName: string;
    role: Role;
    token?: string;
    id: string;

}
