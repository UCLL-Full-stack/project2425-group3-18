import { Profile } from './profile';
import { User as UserPrisma, Profile as ProfilePrisma } from '@prisma/client';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private profile?: Profile | null;

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        profile?: Profile | null;
    }) {
        this.id = user.id;
        this.firstName = this.validateName(user.firstName);
        this.lastName = this.validateName(user.lastName);
        this.email = this.validateEmail(user.email);
        this.password = this.validatePassword(user.password);
        user.profile ? this.profile = user.profile : null;
    }

    private validateName(name: string): string {
        if (!name || name.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        return name;
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

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = this.validateName(firstName);
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = this.validateName(lastName);
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

    getProfile(): Profile | null | undefined {
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
            this.firstName === user.getLastName() &&
            this.lastName === user.getLastName()&&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }

    static from({
        id,
        firstName,
        lastName,
        email,
        password,
        profile,
    }: UserPrisma & { profile: ProfilePrisma | null }) {
        return new User({
            id,
            firstName,
            lastName,
            email,
            password,
            profile: profile ? Profile.from(profile) : null,
        });
    }
}
