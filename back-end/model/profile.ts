import { User } from "./user";

export class Profile {

    readonly firstName: string;
    readonly lastName: string;
    readonly bio: string;
    readonly role: string;
    readonly user: User;

    constructor( profile: {firstName: string; lastName: string; bio: string; role: string; user: User }) {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.bio = profile.bio;
        this.role = profile.role;
        this.user = profile.user;
    }
}