import  { Profile } from './profile';

export class User {

    readonly userName: string;
    readonly email: string;
    readonly password: string;
    readonly profile: Profile;

    constructor(user: { userName: string; email: string; password: string; profile: Profile }) {
        this.userName = user.userName;
        this.email = user.email;
        this.password = user.password;
        this.profile = user.profile;
    }
}