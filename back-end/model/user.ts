import { Profile } from './profile';

export class User {
    private userName: string;
    private email: string;
    private password: string;
    private profile: Profile | null;

    constructor(user: { userName: string, email: string, password: string }) {
        this.userName = this.validateUserName(user.userName);
        this.email = this.validateEmail(user.email);
        this.password = this.validatePassword(user.password);
        this.profile = null; 
    }

    private validateUserName(userName: string): string {
        if (!userName || userName.trim() === '') {
            throw new Error('UserName cannot be empty');
        }
        return userName;
    }

    private validateEmail(email: string): string {
        if (!email || email.trim() === '') {
            throw new Error('Email cannot be empty');
        }
        const emailRegex = /^[^\s@]+@[^\s@]*\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            throw new Error('Email is not valid');
        }
        return email;
    }

    private validatePassword(password: string): string {
        if (!password || password.trim() === '') {
            throw new Error('Password cannot be empty');
        }
        return password;
    }

    getUserName(): string {
        return this.userName;
    }

    setUserName(userName: string): void {
        this.userName = this.validateUserName(userName);
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = this.validateEmail(email);
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = this.validatePassword(password);
    }

    getProfile(): Profile | null {
        return this.profile;
    }

    setProfile(newProfile: Profile): void {
        if (!newProfile) {
            throw new Error('Profile cannot be empty');
        }
        this.profile = newProfile;
    }
}
