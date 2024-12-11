import { Profile } from './profile';
import { User as UserPrisma, Profile as ProfilePrisma } from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private profile: Profile | null;

    constructor(user: { id?: number; username: string; email: string; password: string; profile: Profile | null }) {
        this.id = user.id;
        this.username = this.validateUsername(user.username);
        this.email = this.validateEmail(user.email);
        this.password = this.validatePassword(user.password);
        this.profile = user.profile;
    }

    private validateUsername(userName: string): string {
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

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(userName: string): void {
        this.username = this.validateUsername(userName);
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

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }

    static from({
        id,
        username,
        email,
        password,
        profile,
    }: UserPrisma & { profile: ProfilePrisma | null }) {
        return new User({
            id,
            username,
            email,
            password,
            profile: profile ? Profile.from(profile) : null,
        });
    }
}
