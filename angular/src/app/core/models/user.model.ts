export class User {
    _id?: string;
    name: string;
    email: string;
    password: string;

    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
    }
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

