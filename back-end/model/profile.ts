import { Kot } from './kot';
import { Post } from './post';
import { Profile as Profileprisma, Kot as KotPrisma, Post as PostPrisma } from '@prisma/client';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

export class Profile {
    private id?: number;
    private username: string;
    private bio: string;
    private role: role;

    constructor(profile: { id?: number; username: string; bio: string; role: role }) {
        this.id = profile.id;
        this.username = this.validateName(profile.username);
        this.bio = this.validateBio(profile.bio);
        this.role = this.validateRole(profile.role);
    }

    private validateName(name: string): string {
        if (!name || name.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        return name;
    }

    private validateBio(bio: string): string {
        return bio;
    }

    private validateRole(role: role): role {
        if (!role || role.trim() === '') {
            throw new Error('Role cannot be empty');
        }
        if (!['User', 'Admin', 'Moderator'].includes(role)) {
            throw new Error('Role needs to be either User, Admin or Moderator');
        }
        return role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(userName: string): void {
        this.username = this.validateName(userName);
    }

    getBio(): string {
        return this.bio;
    }

    setBio(bio: string): void {
        this.bio = this.validateBio(bio);
    }

    getRole(): role {
        return this.role;
    }

    setRole(role: role): void {
        this.role = this.validateRole(role);
    }

    equals(profile: Profile): boolean {
        return (
            this.id === profile.getId() &&
            this.username === profile.getUsername() &&
            this.bio === profile.getBio() &&
            this.role === profile.getRole()
        );
    }

    static from({ id, username, bio, role }: Profileprisma) {
        return new Profile({
            id,
            username,
            bio,
            role: role as role,
        });
    }
}
