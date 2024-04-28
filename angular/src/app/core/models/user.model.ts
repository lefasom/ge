export class User {
    _id?: string;
    name: string;
    email: string;

    constructor() {
        this.name = '';
        this.email = '';
    }
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

