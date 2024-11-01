import { Profile } from './profile';

export class User {
    private userName: string;
    private email: string;
    private password: string;
    private profile: Profile | null;

    constructor(user: { userName: string; email: string; password: string; }) {
        this.userName = user.userName;
        this.email = user.email;
        this.password = user.password;
        this.profile = null;
    }

    getUserName(): string {
        return this.userName;
    }

    setUserName(userName: string): void {
        this.userName = userName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getProfile(): Profile | null {
        return this.profile;
    }

    setProfile(newProfile: Profile): void {
        this.profile = newProfile;
    }
}
